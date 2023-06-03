module.exports = {
  // 创建关于信息
  createAboutRequest: {
    imgs: {
      type: 'array',
      itemType: 'Img',
      required: false,
    },
    desc: {
      type: 'string',
      required: false,
    },
    tags: {
      type: 'array',
      itemType: 'string',
      required: false,
    },
    showResume: {
      type: 'boolean',
      default: false,
    },
  },
  // 更新关于信息
  updateAboutRequest: {
    imgs: {
      type: 'array',
      itemType: 'Img',
      required: false,
    },
    desc: {
      type: 'string',
      required: false,
    },
    tags: {
      type: 'array',
      itemType: 'string',
      required: false,
    },
    showResume: {
      type: 'boolean',
      default: false,
    },
  },
};
