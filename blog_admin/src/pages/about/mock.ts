import Mock from 'mockjs';
import setupMock from '../../utils/setupMock';

const data = {
  // tags: ['Vue', 'React', 'Node.js', '小程序', 'Uni-app', 'Egg', 'Serverless'],
  tags: [
    { id: '1', name: 'Vue' },
    { id: '2', name: 'React' },
    { id: '3', name: 'Node.js' },
    { id: '4', name: '小程序' },
    { id: '5', name: 'Uni-app' },
    { id: '6', name: 'Egg' },
    { id: '7', name: 'Serverless' },
  ],
  createTime: 1598256646,
  updateTime: 1637546956,
  showResume: false,
  _id: '5f43760694c942f8bc6daaa9',
  desc:
    '有0年开发经验，不熟悉Vue、React、Angular、Taro、Uni-app等前端主流框架。熟悉小程序开发，以及NodeJs、Koa、Egg等技术也有研究使用。',
  imgs: [
    {
      _id: '619afbcc569543592bdb5da2',
      imgUrl: 'https://xuwenliu.github.io/img/index.jpg',
      link: '',
    },
    {
      _id: '619afbcc569543592bdb5da3',
      imgUrl: 'https://xuwenliu.github.io/img/archive.jpg',
      link: '',
    },
    {
      _id: '619afbcc569543592bdb5da4',
      imgUrl: 'http://nevergiveupt.top/tags.jpg',
      link: '',
    },
  ],
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/about'), (params) => {
      switch (params.type) {
        case 'PUT':
          const body = JSON.parse(params.body);
          return {
            msg: '关于信息修改成功',
            data: body,
            code: 0,
          };
        case 'POST':
          const postBody = JSON.parse(params.body);
          return {
            msg: '关于信息添加成功',
            code: 0,
            data: postBody,
          };
        case 'GET':
        default:
          return {
            msg: '关于信息获取成功',
            code: 0,
            data,
          };
      }
    });
  },
});
