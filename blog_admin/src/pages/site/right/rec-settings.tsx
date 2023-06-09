import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Card,
  Modal,
  Form,
  Message,
  Popconfirm,
  Select,
  Badge,
  Avatar,
  Tooltip,
  Tag,
  Radio,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import copy from 'copy-to-clipboard';
import { IconLink } from '@arco-design/web-react/icon';
import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../../utils/useLocale';
import { ReducerState } from '../../../redux';
import styles from './style/index.module.less';
import {
  getListRecommend,
  createRecommend,
  updateRecommend,
  removeRecommend,
} from '../../../api/site/right';
import { projects, showPositionsColorObj, showPositions } from '../../../utils/constants';
import UploadImages from '../../../components/UploadImages';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function RecSettings() {
  const locale = useLocale();
  // 这里这个form就存储了表单的数据
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('添加标签');

  const onUpdate = async (row) => {
    // console.log(row);
    // console.log('update');
    dispatch({ type: TOGGLE_VISIBLE, payload: { visible: true } });
    row.imgs = [
      {
        imgUrl: row.cover,
        link: row.link,
      },
    ];
    form.setFieldsValue(row);
    setTitle('修改推荐信息');
  };

  const onDelete = async (row) => {
    // console.log(row);
    const res: any = await removeRecommend(row);
    if (res.code === 0) {
      fetchData();
      Message.success(res.msg);
    } else {
      Message.error('删除失败，请重试');
    }
  };

  const copyLink = (msg) => {
    if (copy(msg)) Message.success('复制成功');
    else Message.error('复制失败');
  };

  const columns = [
    {
      title: '类别',
      dataIndex: 'project',
      width: 100,
      render: (_, record) => {
        const colorObj = {
          1: 'purple',
          2: 'pink',
          3: '#52c41a',
        };
        const text = projects[+record.project - 1].value;
        return <Badge dotStyle={{ background: colorObj[record.project] }} text={text} />;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 110,
    },
    {
      title: '封面',
      dataIndex: 'cover',
      width: 100,
      render: (_, record: any) => {
        return (
          <Avatar shape="square">
            <img src={record.cover} />
          </Avatar>
        );
      },
    },
    {
      title: '链接',
      dataIndex: 'link',
      width: 80,
      render: (_, record) => {
        return (
          <Tooltip content={record.link}>
            <a style={{ cursor: 'pointer' }}>
              <IconLink onClick={() => copyLink(record.link)} />
            </a>
          </Tooltip>
        );
      },
    },
    {
      title: 'VIP',
      dataIndex: 'isVip',
      width: 80,
      render: (_, record) => {
        return record.isVip ? '是' : '否';
      },
    },
    {
      title: '展示位置',
      dataIndex: 'showPosition',
      render: (_, record) => {
        return record.showPosition.map((sub) => (
          <Tag
            style={{ marginRight: 10, marginBottom: 10 }}
            key={sub}
            color={showPositionsColorObj[sub]}
          >
            {sub}
          </Tag>
        ));
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        return dayjs(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss');
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
      width: 140,
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button
            disabled={record.status}
            onClick={() => onUpdate(record)}
            type="text"
            size="small"
          >
            {locale['searchTable.columns.operations.update']}
          </Button>
          <Popconfirm
            disabled={record.status}
            focusLock
            title="确定要删除吗？"
            onOk={() => onDelete(record)}
            /* onCancel={() => {
          Message.error({
            content: 'cancel',
          });
        }} */
          >
            <Button disabled={record.status} type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const RecommendState = useSelector((state: ReducerState) => state.recommend);

  const { data, pagination, loading, formParams, visible, confirmLoading } = RecommendState;

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
      const res: any = await getListRecommend(postData);
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

  /* function onSearch(name) {
  } */
  const onSelectChange = async (project) => {
    // console.log(project);
    fetchData(1, pagination.pageSize, { project });
  };

  const onAdd = () => {
    dispatch({ type: TOGGLE_VISIBLE, payload: { visible: true } });
  };
  const onCancel = () => {
    dispatch({ type: TOGGLE_VISIBLE, payload: { visible: false } });
    form.resetFields();
  };
  const onOk = async () => {
    await form.validate();
    const data = form.getFields();
    // console.log('data', data);

    if (data.imgs && data.imgs.length) {
      data.cover = data.imgs[0].imgUrl;
      data.link = data.imgs[0].link;
    }
    let func = createRecommend;
    if (data._id) {
      func = updateRecommend;
    }
    dispatch({
      type: TOGGLE_CONFIRM_LOADING,
      payload: { confirmLoading: true },
    });
    const res: any = await func(data);
    if (res.code === 0) {
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: { confirmLoading: false },
      });
      onCancel();
      fetchData();
      Message.success(res.msg);
    } else {
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: { confirmLoading: false },
      });
      Message.error('添加失败，请重试');
    }
  };

  return (
    <div className={styles.container}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button onClick={onAdd} type="primary">
              添加推荐
            </Button>
          </div>
          <div>
            <Select
              style={{ width: 300 }}
              placeholder="请选择推荐项目"
              onChange={onSelectChange}
              defaultValue=""
            >
              {[
                {
                  key: '',
                  value: '全部',
                },
                ...projects,
              ].map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading}
          onChange={onChangeTable}
          pagination={pagination}
          data={data}
          columns={columns}
        />

        <Modal
          title={<div style={{ textAlign: 'left' }}> {title} </div>}
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form {...formItemLayout} form={form}>
            <FormItem
              label="推荐项目"
              field="project"
              rules={[{ required: true, message: '请选择推荐项目' }]}
            >
              <Select placeholder="请选择推荐项目">
                {projects.map((item) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.value}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>

            <FormItem label="名称" field="name" rules={[{ required: true, message: '请输入名称' }]}>
              <Input placeholder="请输入名称" />
            </FormItem>

            <FormItem
              label="展示位置"
              field="showPosition"
              rules={[{ required: true, message: '请选择展示位置' }]}
            >
              <Select mode="multiple" placeholder="请选择展示位置">
                {showPositions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>

            <FormItem
              label="平台"
              field="platform"
              rules={[{ required: true, message: '请输入平台' }]}
            >
              <Input placeholder="请输入平台" />
            </FormItem>

            <FormItem label="是否需要VIP" field="isVip">
              <Radio.Group>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </FormItem>

            <FormItem
              label="封面/链接"
              field="imgs"
              rules={[{ required: true, message: '请上传封面/链接' }]}
            >
              <UploadImages />
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default RecSettings;
