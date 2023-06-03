module.exports = {
  // 创建文章
  createArticleRequest: {
    title: {
      type: 'string',
      required: true,
      description: '文章标题',
      example: '文章标题',
    },
    content: {
      type: 'string',
      required: true,
      description: '文章内容',
      example: '文章内容',
    },
    cover: {
      type: 'string',
      required: true,
      description: '文章封面',
      example: '文章封面',
    },
    introduction: {
      type: 'string',
      required: true,
      description: '文章简介',
      example: '文章简介',
    },
    categories: {
      type: 'string',
      required: true,
      description: '文章分类',
      example: '文章分类',
    },
    tags: {
      type: 'array',
      itemType: 'string',
      required: true,
      description: '文章标签',
      example: '文章标签',
    },
    views: {
      type: 'number',
      required: true,
      description: '文章浏览量',
      example: 1,
    },
    comment: {
      type: 'number',
      required: true,
      description: '文章评论数',
      example: 1,
    },
    like: {
      type: 'number',
      required: true,
      description: '文章点赞数',
      example: 1,
    },
    collect: {
      type: 'number',
      required: true,
      description: '文章收藏数',
      example: 1,
    },
    isComment: {
      type: 'boolean',
      required: true,
      description: '是否允许评论',
      example: true,
    },
    isLike: {
      type: 'boolean',
      required: true,
      description: '是否允许点赞',
      example: true,
    },
    isCollect: {
      type: 'boolean',
      required: true,
      description: '是否允许收藏',
      example: true,
    },
    isReward: {
      type: 'boolean',
      required: true,
      description: '是否允许打赏',
      example: true,
    },
    publishStatus: {
      type: 'number',
      required: true,
      description: '文章发布状态',
      example: 1,
    },
    status: {
      type: 'number',
      required: true,
      description: '文章状态',
      example: 1,
    },
  },
  // 更新文章
  updateArticleRequest: {
    title: {
      type: 'string',
      required: false,
      description: '文章标题',
      example: '文章标题',
    },
    content: {
      type: 'string',
      required: false,
      description: '文章内容',
      example: '文章内容',
    },
    cover: {
      type: 'string',
      required: false,
      description: '文章封面',
      example: '文章封面',
    },
    introduction: {
      type: 'string',
      required: false,
      description: '文章简介',
      example: '文章简介',
    },
    categories: {
      type: 'string',
      required: false,
      description: '文章分类',
      example: '文章分类',
    },
    tags: {
      type: 'array',
      itemType: 'string',
      required: false,
      description: '文章标签',
      example: '文章标签',
    },
    views: {
      type: 'number',
      required: false,
      description: '文章浏览量',
      example: 1,
    },
    comment: {
      type: 'number',
      required: false,
      description: '文章评论数',
      example: 1,
    },
    like: {
      type: 'number',
      required: false,
      description: '文章点赞数',
      example: 1,
    },
    collect: {
      type: 'number',
      required: false,
      description: '文章收藏数',
      example: 1,
    },
    isComment: {
      type: 'boolean',
      required: false,
      description: '是否允许评论',
      example: true,
    },
    isLike: {
      type: 'boolean',
      required: false,
      description: '是否允许点赞',
      example: true,
    },
    isCollect: {
      type: 'boolean',
      required: false,
      description: '是否允许收藏',
      example: true,
    },
    isReward: {
      type: 'boolean',
      required: false,
      description: '是否允许打赏',
      example: true,
    },
    publishStatus: {
      type: 'number',
      required: false,
      description: '文章发布状态',
      example: 1,
    },
    status: {
      type: 'number',
      required: false,
      description: '文章状态',
      example: 1,
    },
  },

  // 修改文章状态
  changeStatusRequest: {
    status: {
      type: 'number',
      required: true,
      description: '文章状态',
      example: 1,
    },
  },
  // 修改文章发布状态
  changePublishStatusRequest: {
    publishStatus: {
      type: 'number',
      required: true,
      description: '文章发布状态',
      example: 1,
    },
  },
  // 一键开启/关闭评论收藏
  changeCollectStatusRequest: {
    isCollect: {
      type: 'boolean',
      required: true,
      description: '是否允许收藏',
      example: true,
    },
  },
};
