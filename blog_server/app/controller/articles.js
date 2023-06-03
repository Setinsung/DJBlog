/* eslint-disable jsdoc/check-tag-names */
'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 文章管理
 */
class ArticlesController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.queryListParamsRules = {
      page: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 20,
      },
      title: {
        type: 'string',
        required: false,
        min: 1,
        max: 200,
        allowEmpty: true,
      },
      categories: {
        type: 'string',
        required: false,
        default: '',
      },
      tags: {
        type: 'string', // vue,react
        required: false,
        default: '',
      },
      cover: {
        type: 'string',
        required: false,
      },
      introduction: {
        type: 'string',
        min: 10,
        max: 500,
        required: false,
      },
      status: {
        type: 'string',
        default: '0',
        required: false,
      },
      publishStatus: {
        type: 'string',
        default: '0',
        required: false,
      },
      createStartTime: {
        type: 'string',
        required: false,
        default: 0,
      },
      createEndTime: {
        type: 'string',
        required: false,
        default: 0,
      },
      updateStartTime: {
        type: 'string',
        required: false,
        default: 0,
      },
      updateEndTime: {
        type: 'string',
        required: false,
        default: 0,
      },
    };
    this.webQueryListParamsRules = {
      page: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 20,
      },
      title: {
        type: 'string',
        required: false,
        min: 1,
        max: 200,
        allowEmpty: true,
      },
      categories: {
        type: 'string',
        required: false,
        default: '',
      },
      tags: {
        type: 'string', // vue,react
        required: false,
        default: '',
      },
    };

    this.createRule = {
      title: {
        type: 'string',
        min: 2,
        max: 200,
      },
      cover: {
        type: 'url',
      },
      introduction: {
        type: 'string',
        min: 10,
        max: 500,
      },
      categories: {
        type: 'string',
        min: 2,
        max: 20,
      },
      tags: {
        type: 'array',
        itemType: 'string',
      },
      content: {
        type: 'string',
      },
      views: {
        type: 'number',
        default: 1,
      },
      comment: {
        type: 'number',
        default: 0,
      },
      like: {
        type: 'number',
        default: 0,
      },
      collect: {
        type: 'number',
        default: 0,
      },
      isComment: {
        type: 'boolean',
        default: true,
      },
      isLike: {
        type: 'boolean',
        default: true,
      },
      isCollect: {
        type: 'boolean',
        default: false,
      },
      // 是否开启打赏
      isReward: {
        type: 'boolean',
        default: false,
      },
      status: {
        type: 'number',
        default: 1,
      },
      publishStatus: {
        type: 'number',
        default: 2,
      },
    };

    this.changeStatusRule = {
      status: {
        type: 'number',
        default: 1,
      },
    };
    this.changePublishStatusRule = {
      publishStatus: {
        type: 'number',
        default: 2,
      },
    };
  }

  /**
   * @summary 展示文章列表
   * @description 展示文章列表
   * @router get /web/v1/articles
   * @request query string page 页码
   * @request query string pageSize 每页数量
   * @request query string title 文章标题
   * @request query string categories 文章分类
   * @request query string tags 文章标签
   */
  async showArticles() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.webQueryListParamsRules, data);
    const res = await service.articles.showArticles(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 获取文章列表
   * @description 获取文章列表
   * @router get /api/v1/articles
   * @request query string page 页码
   * @request query string pageSize 每页数量
   * @request query string title 文章标题
   * @request query string categories 文章分类
   * @request query string tags 文章标签
   * @request query string status 文章状态
   * @request query string publishStatus 文章发布状态
   * @request query string createStartTime 文章创建开始时间
   * @request query string createEndTime 文章创建结束时间
   * @request query string updateStartTime 文章更新开始时间
   * @request query string updateEndTime 文章更新结束时间
   * @Jwt
   */
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    // console.log('data', data);
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.articles.index(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 展示文章详情
   * @description 展示文章详情
   * @router get /web/v1/articles/{id}
   * @request path string *id 文章id
   */
  async showArticleDetail() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.articles.showArticleDetail(id);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 获取文件修改详情
   * @description 获取文件修改详情
   * @router get /api/v1/articles/{id}/edit
   * @request path string *id 文章id
   * @Jwt
   */
  async edit() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.articles.edit(id);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 创建文章
   * @description 创建文章
   * @router post /api/v1/articles
   * @request body createArticleRequest *body
   * @Jwt
   */
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.articles.create(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 修改文章
   * @description 修改文章
   * @router put /api/v1/articles/{id}
   * @request path string *id 文章id
   * @request body updateArticleRequest *body
   * @Jwt
   */
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.articles.update({
      id,
      ...data,
    });
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 启用/禁用文章
   * @description 启用/禁用文章
   * @router put /api/v1/articles/status/{id}
   * @request path string *id 文章id
   * @request body changeStatusRequest *body
   * @Jwt
   */
  async changeStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.changeStatusRule, data);
    const res = await service.articles.changeStatus({
      id,
      status: data.status,
    });
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 发布/取消发布文章
   * @description 发布/取消发布文章
   * @router put /api/v1/articles/publishStatus/{id}
   * @request path string *id 文章id
   * @request body changePublishStatusRequest *body
   * @Jwt
   */
  async changePublishStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    // console.log('data', data);
    ctx.validate(this.changePublishStatusRule, data);
    const res = await service.articles.changePublishStatus({
      id,
      publishStatus: data.publishStatus,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  /**
   * @summary 一键收藏/取消收藏文章
   * @description 一键收藏/取消收藏文章
   * @router put /api/v1/articles/collectStatus
   * @request body changeCollectStatusRequest *body
   * @Jwt
   */
  async changeCollectStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.articles.changeCollectStatus(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  /**
   * @summary 删除文章
   * @description 删除文章
   * @router delete /api/v1/articles/{id}
   * @request path string *id 文章id
   * @Jwt
   */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.articles.delete(id);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = ArticlesController;
