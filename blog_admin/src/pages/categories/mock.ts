import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';

const Random = Mock.Random;

const data = Mock.mock({
  'list|55': [
    {
      '_id|8': /[A-Z][a-z][-][0-9]/,
      'name|4-8': /[A-Z]/,
      'articleNum|1-4': /[1-9]/,
      createTime: Random.datetime(),
      updateTime: Random.datetime(),
      deadline: Random.datetime(),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/categories'), (params) => {
      const { page = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = page as number;
      const ps = pageSize as number;

      return {
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      };
    });
  },
});
