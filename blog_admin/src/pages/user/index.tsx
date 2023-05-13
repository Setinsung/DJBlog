import React, { useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Message,
  Popconfirm,
  Image,
  Tag,
  Tooltip,
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
import { getList, remove } from '../../api/user';

function UserTable() {
  const locale = useLocale();
  const dispatch = useDispatch();
  const onDelete = async (row) => {
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
      title: '昵称',
      dataIndex: 'nickName',
      width: 100,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 60,
      render: (_, record) => {
        return <Image width={50} height={50} src={record.avatar} />;
      },
    },
    {
      title: '来源',
      dataIndex: 'provider',
      width: 100,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '收藏数量',
      dataIndex: 'articleIds',
      width: 100,
      render: (_, record) => {
        return <Tag color="orange">{record.articleIds ? record.articleIds.length : 0}</Tag>;
      },
    },
    {
      title: '简介',
      dataIndex: 'introduction',
      width: 400,
      render: (text) => {
        return (
          <Tooltip content={text} position="tl">
            {text}
          </Tooltip>
        );
      },
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      width: 120,
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
          <Popconfirm focusLock title="确定要删除吗？" onOk={() => onDelete(record)}>
            <Button type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const UserState = useSelector((state: ReducerState) => state.user);

  const { data, pagination, loading, formParams } = UserState;

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

  function onSearch(nickName) {
    fetchData(1, pagination.pageSize, { nickName });
  }

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入昵称"
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
          columns={columns}
        />
      </Card>
    </div>
  );
}

export default UserTable;
