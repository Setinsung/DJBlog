'use strict';

const Controller = require('egg').Controller;

class AdController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      imgs: {
        type: 'array',
        min: 1,
        max: 20,
        itemType: 'object',
        rule: {
          imgUrl: {
            type: 'string',
          },
          link: {
            type: 'string',
          },
        },
      },
      showPosition: {
        type: 'array',
        itemType: 'string',
        min: 1,
        max: 10,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const res = await service.siteConfig.right.ad.index();
    ctx.helper.success({ ctx, res });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // console.log('data', data);
    ctx.validate(this.createRule, data);
    const res = await service.siteConfig.right.ad.create(data);
    ctx.helper.success({ ctx, res });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.siteConfig.right.ad.update({
      id,
      ...data,
    });
    ctx.helper.success({ ctx, res });
  }

}

module.exports = AdController;
