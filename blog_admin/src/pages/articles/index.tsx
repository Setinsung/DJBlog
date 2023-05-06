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
  Avatar,
  Tag,
  Radio,
  Breadcrumb,
  Switch,
  Badge,
  DatePicker,
  Grid,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {
  IconDelete,
  IconDownload,
  IconEdit,
  IconEye,
  IconUpload,
} from '@arco-design/web-react/icon';
import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, create, update, remove } from '../../api/articles';
import {
  projects,
  showPositionsColorObj,
  showPositions,
  statusOptions,
  publishStatusOptions,
} from '../../utils/constants';
import UploadImages from '../../components/UploadImages/index.';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function Articles() {
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
    setTitle('修改标签');
  };

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

  // 审核状态修改
  const onStatusChange = (checked, record) => {};

  // 发布状态修改
  const onChangePublishStatus = (record) => {};

  // 查看
  const onView = (record) => {};

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
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
      title: '简介',
      dataIndex: 'introduction',
    },
    {
      title: '分类',
      dataIndex: 'categories',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record) => {
        const result = [];
        for (let i = 0; i < record.tags.length; i += 3) {
          result.push(record.tags.slice(i, i + 3)); // i=0 0-3 i=3 3-6
        }
        return result.map((item, index) => {
          return (
            <div style={{ marginBottom: 10 }} key={index}>
              {item.map((sub) => (
                <Tag style={{ marginRight: 10 }} key={sub}>
                  {sub}
                </Tag>
              ))}
            </div>
          );
        });
      },
    },
    {
      title: '查看/评论/点赞/收藏	',
      dataIndex: 'views',
      render: (_, record) => {
        return `${record.views}/${record.comment}/${record.like}/${record.collect}`;
      },
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      render: (_, record: any) => {
        return (
          <Switch
            checkedText="启用"
            uncheckedText="停用"
            checked={record.status === 1}
            onChange={(checked) => onStatusChange(checked, record)}
          />
        );
      },
    },
    {
      title: '发布状态',
      dataIndex: 'publishStatus',
      render: (text, record) => {
        const texts = {
          1: '已发布',
          2: '未发布',
        };
        const enums = {
          1: 'success',
          2: 'error',
        };
        return <Badge status={enums[record.publishStatus]} text={texts[record.publishStatus]} />;
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
      title: '操作',
      width: 140,
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          <Button onClick={() => onChangePublishStatus(record)} type="text" size="default">
            {record.publishStatus === 1 ? <IconDownload color="red" /> : <IconUpload />}
          </Button>
          <Button onClick={() => onView(record)} type="text" size="default">
            <IconEye />
          </Button>
          {record.publishStatus === 2 && (
            <>
              <Button onClick={() => onUpdate(record)} type="text" size="default">
                <IconEdit />
              </Button>
              <Popconfirm focusLock title="确定要删除吗？" onOk={() => onDelete(record)}>
                <Button type="text" status="danger" size="default">
                  <IconDelete />
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  const ArticlesState = useSelector((state: ReducerState) => state.articles);

  const { data, pagination, loading, formParams, visible, confirmLoading } = ArticlesState;

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
        dispatch({ type: UPDATE_LIST, payload: { data: res.list } });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: { pagination: { ...pagination, current, pageSize, total: res.totalCount } },
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
    console.log(project);
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
    console.log('data', data);

    if (data.imgs && data.imgs.length) {
      data.cover = data.imgs[0].imgUrl;
      data.link = data.imgs[0].link;
    }
    let func = create;
    if (data._id) {
      func = update;
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
      Message.error('添加失败，请重试');
    }
  };
  const Layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>文章管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button onClick={onAdd} type="primary">
              添加文章
            </Button>
            <Button.Group style={{ marginLeft: 20 }}>
              <Button style={{ padding: '0 8px' }}>一键开启收藏</Button>
              <Button status="danger" style={{ padding: '0 8px' }}>
                一键关闭收藏
              </Button>
            </Button.Group>
          </div>
        </div>
        <Form {...Layout} layout="horizontal" style={{ marginBottom: 20 }}>
          <Row>
            <Col span={6}>
              {' '}
              <Form.Item label="文章标题">
                <Input placeholder="请输入文章标题" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="分类">
                <Select placeholder="请选择分类" defaultValue="">
                  {[
                    {
                      key: '',
                      value: '全部',
                    },
                    ...projects,
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              {' '}
              <Form.Item label="标签">
                <Select mode="multiple" placeholder="请选择标签" defaultValue="">
                  {[
                    {
                      key: '',
                      value: '全部',
                    },
                    ...projects,
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="文章状态">
                <Select placeholder="请选择文章状态" defaultValue="">
                  {[
                    {
                      key: '',
                      value: '全部',
                    },
                    ...statusOptions,
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item label="发布状态">
                <Select placeholder="请选择文章发布状态" defaultValue="">
                  {[
                    {
                      key: '',
                      value: '全部',
                    },
                    ...publishStatusOptions,
                  ].map((item) => (
                    <Select.Option key={item.key} value={item.key}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              {' '}
              <Form.Item label="创建时间">
                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
            <Col span={6}>
              {' '}
              <Form.Item label="修改时间">
                <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
            </Col>
            <Col span={4} offset={2}>
              <Form.Item>
                <Button>重置</Button>
                <Button style={{ marginLeft: 20 }} type="primary">
                  搜索
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

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

export default Articles;
