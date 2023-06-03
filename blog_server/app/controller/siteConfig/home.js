'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller web端首页配置信息
 */
class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      introduction: {
        type: 'string',
        min: 2,
        max: 100,
      },
      effects: {
        type: 'boolean',
        default: false,
      },
      archiveBgImg: {
        type: 'string',
      },
      categoriesBgImg: {
        type: 'string',
      },
      categoriesDetailBgImg: {
        type: 'string',
      },
      tagsBgImg: {
        type: 'string',
      },
      tagsDetailBgImg: {
        type: 'string',
      },
      aboutBgImg: {
        type: 'string',
      },
    };
  }
  /**
   * @summary 获取首页配置信息
   * @description 获取首页配置信息
   * @router get /web/v1/config/home
   */
  async index() {
    const { ctx, service } = this;
    const res = await service.siteConfig.home.index();
    ctx.helper.success({ ctx, res });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.siteConfig.home.create(data);
    ctx.helper.success({ ctx, res });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.siteConfig.home.update({
      id,
      ...data,
    });
    ctx.helper.success({ ctx, res });
  }

}

module.exports = HomeController;
