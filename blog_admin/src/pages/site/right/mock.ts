import Mock from 'mockjs';

import setupMock from '../../../utils/setupMock';

const data = {
  tags: ['0年前端开发经验'],
  showPosition: ['文章', '文章详情'],
  createTime: 1598256829,
  updateTime: 1600164867,
  _id: '5f4376bd94c942f8bc6daab1',
  friendLink: [
    {
      _id: '5f4376bd94c942f8bc6daab2',
      link: 'https://xuwenliu.github.io/',
      icon: 'github',
    },
    {
      _id: '5f4376bd94c942f8bc6daab3',
      link: 'https://segmentfault.com/u/xuwenliu/answers',
      icon: 'sf',
    },
    {
      _id: '5f4376bd94c942f8bc6daab4',
      link: 'https://www.zhihu.com/people/xu-wen-liu-83/posts',
      icon: 'zhihu',
    },
  ],
  nickName: 'NeverGiveUpT',
  desc: '不专注于WEB和移动前端开发',
};

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/config/right/introduction'), (params) => {
      console.log('---', params);

      switch (params.type) {
        case 'PUT':
          const body = JSON.parse(params.body);
          return {
            msg: '个人简介修改成功',
            data: body,
            code: 0,
          };
        case 'POST':
          const postBody = JSON.parse(params.body);
          return {
            msg: '个人简介添加成功',
            code: 0,
            data: postBody,
          };
        case 'GET':
        default:
          return {
            msg: '个人简介获取成功',
            code: 0,
            data,
          };
      }
    });
  },
});
