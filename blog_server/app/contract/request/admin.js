module.exports = {
  // 管理员登录
  adminLoginRequest: {
    userName: {
      type: 'string',
      required: true,
      description: '用户名',
      example: 'admin',
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: '123456',
    },
  },
};
