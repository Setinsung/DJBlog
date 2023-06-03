'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller web端推荐配置信息
 */
class RecommendController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      project: {
        type: 'string',
      },
      showPosition: {
        type: 'array',
        itemType: 'string',
        min: 1,
        max: 10,
      },
      name: {
        type: 'string',
        min: 1,
        max: 50,
      },
      cover: {
        type: 'url',
      },
      link: {
        type: 'url',
      },
      platform: {
        type: 'string',
        min: 1,
        max: 20,
      },
      isVip: {
        type: 'boolean',
        default: false,
      },
    };
    this.queryRule = {
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
      project: {
        type: 'string',
        required: false,
      },
    };
  }
  /**
   * @summary 获取推荐配置
   * @description 获取推荐配置
   * @router get /web/v1/config/recommend
   * @request query string project 项目名称
   * @request query string page 页码
   * @request query string pageSize 每页数量
   */
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryRule, data);
    const res = await service.siteConfig.right.recommend.index(data);
    ctx.helper.success({ ctx, res });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // console.log('data', data);
    ctx.validate(this.createRule, data);
    const res = await service.siteConfig.right.recommend.create(data);
    ctx.helper.success({ ctx, res });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.siteConfig.right.recommend.update({
      id,
      ...data,
    });
    ctx.helper.success({ ctx, res });
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.siteConfig.right.recommend.delete(id);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = RecommendController;
