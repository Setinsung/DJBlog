/* eslint-disable jsdoc/check-tag-names */
'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 关于管理
 */
class AboutController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.createRule = {
      imgs: {
        type: 'array',
        itemType: 'object',
        min: 1,
        max: 3,
        rule: {
          imgUrl: 'url',
          link: {
            type: 'string',
            required: false,
          },
        },
      },
      desc: {
        type: 'string',
        min: 1,
        max: 800,
      },
      tags: {
        type: 'array',
        itemType: 'string',
        min: 1,
        max: 20,
      },
      showResume: {
        type: 'boolean',
        default: false,
      },
    };
  }
  /**
   * @summary 展示关于信息
   * @description 展示关于信息
   * @router get /web/v1/about
   */
  async showAbout() {
    const { ctx, service } = this;
    const res = await service.about.showAbout();
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 获取关于信息
   * @description 获取关于信息
   * @router get /api/v1/about
   * @Jwt
   */
  async index() {
    const { ctx, service } = this;
    const res = await service.about.index();
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 创建关于信息
   * @description 创建关于信息
   * @router post /api/v1/about
   * @request body createAboutRequest *body
   * @Jwt
   */
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.about.create(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 更新关于信息
   * @description 更新关于信息
   * @router put /api/v1/about/:id
   * @request path string *id
   * @request body updateAboutRequest *body
   * @Jwt
   */
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log('data', data);
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.about.update({
      id,
      ...data,
    });
    ctx.helper.success({ ctx, res });
  }

}

module.exports = AboutController;
