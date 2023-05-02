import Mock from 'mockjs';
import qs from 'query-string';
import setupMock from '../../utils/setupMock';

const Random = Mock.Random;

const list = [];
for (let i = 0; i < 10; i++) {
  const obj = {
    '_id|8': /[A-Z][a-z][-][0-9]/,
    'uid|10': /[A-Z][a-z][-][0-9]/,
    'articleNum|1': /[0]/,
    'provider|1': ['github', 'weibo', 'qq', 'wechat'],
    email: Random.email(),
    nickName: Mock.mock('@cname'),
    avatar: Random.image('200x200', '#4A7BF7', 'avatar'),
    introduction: Random.cparagraph(),
    loginTime: Random.datetime(),
    registerTime: Random.datetime(),
    'articleIds|1-10': Random.guid(),
  };
  list.push(obj);
}

const data = Mock.mock({
  'list|55': list,
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/user'), (params) => {
      switch (params.type) {
        case 'DELETE':
          const { _id } = JSON.parse(params.body);
          const deleteIndex = data.list.findIndex((item) => item._id === _id);
          data.list.splice(deleteIndex, 1);
          return {
            msg: '用户删除成功',
            data: null,
            code: 0,
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
