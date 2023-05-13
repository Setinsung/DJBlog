'use strict';

const Controller = require('egg').Controller;

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

  async index() {
    const { ctx, service } = this;
    const res = await service.siteConfig.home.index();
    ctx.helper.success({ ctx, res });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log('data', data);
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
