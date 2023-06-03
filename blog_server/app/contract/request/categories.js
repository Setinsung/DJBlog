module.exports = {
  // 创建分类
  createCategoriesRequest: {
    name: {
      type: 'string',
      required: true,
      description: '标签名称',
      example: '前端',
    },
  },
  // 更新分类
  updateCategoriesRequest: {
    name: {
      type: 'string',
      required: true,
      description: '标签名称',
      example: '后端',
    },
  },
};
