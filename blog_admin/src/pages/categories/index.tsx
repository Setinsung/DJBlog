import React, { useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Modal,
  Form,
  Message,
  Popconfirm,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, create, update, remove } from '../../api/categories';
import { EditableCell, EditableRow } from './editable';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function CategoriesTable() {
  const locale = useLocale();
  // 这里这个form就存储了表单的数据
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onDelete = async (row) => {
    // console.log(row);
    const res: any = await remove(row);
    if (res.code === 0) {
      fetchData();
      Message.success(res.msg);
    } else {
      Message.error('删除失败，请重试');
    }
  };
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        return record.createTime
          ? dayjs(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (_, record) => {
        return record.updateTime
          ? dayjs(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },

    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          {/* <Button type="text" size="small">
            {locale['searchTable.columns.operations.update']}
          </Button> */}
          <Popconfirm
            focusLock
            title="确定要删除吗？"
            onOk={() => onDelete(record)}
            /* onCancel={() => {
              Message.error({
                content: 'cancel',
              });
            }} */
          >
            <Button type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const CategoriesState = useSelector((state: ReducerState) => state.categories);

  const { data, pagination, loading, formParams, visible, confirmLoading } = CategoriesState;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        page: current,
        pageSize,
        ...params,
      };
      // console.log(postData);
      const res: any = await getList(postData);
      // console.log(res);
      if (res) {
        dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: { pagination: { ...pagination, current, pageSize, total: res.data.totalCount } },
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (error) {}
  }

  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }

  function onSearch(name) {
    fetchData(1, pagination.pageSize, { name });
  }
  const onAdd = () => {
    dispatch({ type: TOGGLE_VISIBLE, payload: { visible: true } });
  };
  const onCancel = () => {
    dispatch({ type: TOGGLE_VISIBLE, payload: { visible: false } });
    // 同时还要清空表单
    form.resetFields();
  };
  const onOk = async () => {
    // 先校验表单，然后再提交
    await form.validate();
    const data = form.getFields(); // {name: '123'}
    // 向redux中修改confirmLoading开启loading
    dispatch({
      type: TOGGLE_CONFIRM_LOADING,
      payload: { confirmLoading: true },
    });
    const res: any = await create(data);
    // 如果成功，关闭loading，关闭弹窗，重新请求数据
    if (res.code === 0) {
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: { confirmLoading: false },
      });
      onCancel();
      fetchData();
      Message.success(res.msg);
    } else {
      Message.error('添加失败，请重试');
    }
    // console.log(res);
  };

  const onHandleSave = async (row) => {
    const res: any = await update(row);
    if (res.code === 0) {
      fetchData();
      Message.success(res.msg);
    } else {
      Message.error('修改失败，请重试');
    }
  };

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button onClick={onAdd} type="primary">
              添加分类
            </Button>
          </div>
          <div>
            {/* <DatePicker.RangePicker style={{ marginRight: 8 }} onChange={onDateChange} /> */}
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入分类名称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          data={data}
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          columns={columns.map((column) =>
            column.editable
              ? {
                  ...column,
                  onCell: () => ({
                    onHandleSave,
                  }),
                }
              : column
          )}
          // 因为是less，这里要用styles获取css类名，注意EditableRow和EditableCell也要修改
          className={styles['table-demo-editable-cell']}
        />

        <Modal
          title={<div style={{ textAlign: 'left' }}>添加分类</div>}
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form {...formItemLayout} form={form}>
            <FormItem
              label="分类名称"
              field="name"
              rules={[{ required: true, message: '请输入分类名称' }]}
            >
              <Input placeholder="" />
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default CategoriesTable;
