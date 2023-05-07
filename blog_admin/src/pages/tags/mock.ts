import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';

const Random = Mock.Random;

const data = Mock.mock({
  'list|55': [
    {
      '_id|8': /[A-Z][a-z][-][0-9]/,
      'name|4-8': /[A-Z]/,
      'articleNum|1': /[0]/,
      status: true,
      createTime: Random.datetime(),
      updateTime: Random.datetime(),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/tags/status'), (params) => {
      switch (params.type) {
        case 'PUT':
          const body = JSON.parse(params.body);
          // console.log(body);
          const putIndex = data.list.findIndex((item) => item._id === body.id);
          data.list[putIndex] = { ...data.list[putIndex], ...body };
          return {
            msg: '标签修改成功',
            data: null,
            code: 0,
          };
        default:
          const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
          const p = page as number;
          const ps = pageSize as number;
          return {
            list: data.list.slice((p - 1) * ps, p * ps),
            totalCount: 55,
          };
      }
    });
    Mock.mock(new RegExp('/api/v1/tags'), (params) => {
      switch (params.type) {
        case 'DELETE':
          const { _id } = JSON.parse(params.body);
          const deleteIndex = data.list.findIndex((item) => item._id === _id);
          data.list.splice(deleteIndex, 1);
          return {
            msg: '标签删除成功',
            data: null,
            code: 0,
          };
        case 'PUT':
          const body = JSON.parse(params.body);
          const putIndex = data.list.findIndex((item) => item._id === body._id);
          data.list[putIndex] = { ...data.list[putIndex], ...body };
          return {
            msg: '标签修改成功',
            data: null,
            code: 0,
          };
        case 'POST':
          const { name } = JSON.parse(params.body);
          // console.log(name);
          const returnData = Mock.mock({
            '_id|8': /[A-Z][a-z][-][0-9]/,
            name,
            articleNum: 0,
            status: true,
            createTime: Random.datetime(),
            updateTime: Random.datetime(),
          });
          data.list.unshift(returnData);
          return {
            msg: '标签添加成功',
            code: 0,
            data: returnData,
          };
        case 'GET':
        default:
          const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
          const p = page as number;
          const ps = pageSize as number;
          return {
            list: data.list.slice((p - 1) * ps, p * ps),
            totalCount: 55,
          };
      }
    });
  },
});
