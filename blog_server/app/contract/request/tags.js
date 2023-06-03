module.exports = {
  // 创建标签
  createTagRequest: {
    name: {
      type: 'string',
      required: true,
      description: '标签名称',
      example: 'React',
    },
  },
  // 更新标签
  updateTagRequest: {
    name: {
      type: 'string',
      required: true,
      description: '标签名称',
      example: 'Vue',
    },
  },
  // 更新标签状态
  updateTagStatusRequest: {
    status: {
      type: 'boolean',
      required: true,
      description: '标签状态',
      example: true,
    },
  },
};
