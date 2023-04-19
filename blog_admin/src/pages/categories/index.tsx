import React, { useEffect } from 'react';
import { Table, Button, Input, Breadcrumb, Card } from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList } from '../../api/categories';

function SearchTable() {
  const locale = useLocale();

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
    },

    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      render: () => (
        <div className={styles.operations}>
          <Button type="text" size="small">
            {locale['searchTable.columns.operations.update']}
          </Button>
          <Button type="text" status="danger" size="small">
            {locale['searchTable.columns.operations.delete']}
          </Button>
        </div>
      ),
    },
  ];

  const CategoriesState = useSelector((state: ReducerState) => state.categories);

  const { data, pagination, loading, formParams } = CategoriesState;

  const dispatch = useDispatch();

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
          payload: { pagination: { ...pagination, current, pageSize, total: res.total } },
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

  /* function onDateChange(date) {
    const [start, end] = date;
    fetchData(1, pagination.pageSize, {
      createdTimeStart: start,
      createdTimeEnd: end,
    });
  } */

  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <div>
            <Button type="primary">添加分类</Button>
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
          columns={columns}
          data={data}
        />
      </Card>
    </div>
  );
}

export default SearchTable;
