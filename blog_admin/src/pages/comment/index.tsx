import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Message,
  Popconfirm,
  Select,
  Badge,
  Form,
  Modal,
  Radio,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, remove, updateCommentStatus } from '../../api/comment';
import { auditStatusOptions } from '../../utils/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function CommentsTable() {
  const locale = useLocale();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    articleTitle: '',
    auditStatus: 0,
  });

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState('');

  const onDelete = async (row) => {
    const res: any = await remove(row);
    if (res.code === 0) {
      fetchData();
      Message.success(res.msg);
    } else {
      Message.error('删除失败，请重试');
    }
  };
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
    setId('');
    setConfirmLoading(false);
  };
  const onOk = async () => {
    await form.validate();
    setConfirmLoading(true);
    const values = form.getFields();
    const postData = {
      id,
      ...values,
    };

    // console.log('postData', postData);
    const res: any = await updateCommentStatus(postData);
    // console.log(res);
    if (res.code === 0) {
      Message.success(res.msg);
      setVisible(false);
      fetchData();
      onCancel();
    } else {
      Message.error('审核失败，请重试！');
    }
  };

  const handleAudit = async (record) => {
    setVisible(true);
    setId(record._id);
  };

  const columns: any = [
    {
      title: '文章标题',
      dataIndex: 'articleTitle',
      fixed: 'left',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '当前回复内容',
      dataIndex: 'currentReplayContent',
    },
    {
      title: '目标回复ID',
      dataIndex: 'targetReplayId',
    },
    {
      title: '回复目标内容',
      dataIndex: 'targetReplayContent',
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      render: (text) => {
        const current = auditStatusOptions.filter((item) => item.value === +text);
        const enums = {
          '1': 'success',
          '2': 'error',
          '3': 'warning',
        };
        return <Badge status={enums[current[0].value]} text={current[0].label} />;
      },
    },
    {
      title: '评论时间',
      dataIndex: 'commentTime',
      width: 120,
      render: (text) => {
        return dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      width: 120,
      render: (text) => {
        return dayjs(text * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <div className={styles.operations}>
          <Popconfirm focusLock title="确定要删除吗？" onOk={() => onDelete(record)}>
            <Button type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
          <Button onClick={() => handleAudit(record)} type="text" status="success" size="small">
            审核
          </Button>
        </div>
      ),
    },
  ];

  const CommentState = useSelector((state: ReducerState) => state.comment);

  const { data, pagination, loading, formParams } = CommentState;

  useEffect(() => {
    fetchData(1, pagination.pageSize, query);
  }, [query]);

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

  function onSearch(articleTitle) {
    setQuery({ ...query, articleTitle });
  }
  function onSelectSearch(auditStatus) {
    setQuery({ ...query, auditStatus });
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>评论管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入文章标题"
              onSearch={onSearch}
            />
            <Select
              defaultValue={0}
              placeholder="请选择审核状态"
              style={{ width: 160, marginLeft: 20, marginRight: 20 }}
              onChange={onSelectSearch}
            >
              {auditStatusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => handleAudit({ _id: 0 })}>
              一键审核
            </Button>
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          data={data}
          columns={columns}
          scroll={{ x: 1300 }}
        />
        <Modal
          title="审核"
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form form={form}>
            <FormItem
              label="审核状态"
              field="auditStatus"
              rules={[{ required: true, message: '请选择审核状态' }]}
            >
              <RadioGroup>
                <Radio value={1}>通过</Radio>
                <Radio value={2}>驳回</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default CommentsTable;
