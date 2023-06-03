/* eslint-disable jsdoc/check-tag-names */
'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 分类管理
 */
class CategoriesController extends Controller {
  constructor(ctx) {
    super(ctx);

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
      name: {
        type: 'string',
        required: false,
        allowEmpty: true,
        min: 1,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{1,20}$/,
      },
    };
    this.webQueryRule = {
      name: {
        type: 'string',
        required: false,
        allowEmpty: true,
        min: 1,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{1,20}$/,
      },
    };

    this.createRule = {
      name: {
        type: 'string',
        min: 2,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };

  }
  /**
   * @summary 展示分类列表
   * @description 前台展示分类列表
   * @router get /web/v1/categories
   * @request query string name 分类名称
   */
  async showCategories() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.webQueryRule, data);
    const res = await service.categories.showCategories(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 获取分类列表
   * @description 获取分类列表
   * @router get /api/v1/categories
   * @request query string page 页码
   * @request query string pageSize 每页数量
   * @request query string name 分类名称
   * @Jwt
   */
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryRule, data);
    const res = await service.categories.index(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 创建分类
   * @description 创建分类
   * @router post /api/v1/categories
   * @request body createCategoriesRequest *body
   * @Jwt
   */
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.categories.create(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 更新分类
   * @description 更新分类
   * @router put /api/v1/categories/{id}
   * @request path string *id
   * @request body updateCategoriesRequest *body
   * @Jwt
   */
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.categories.update({
      id,
      name: data.name,
    });
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 删除分类
   * @description 删除分类
   * @router delete /api/v1/categories/{id}
   * @request path string *id
   * @Jwt
   */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.categories.delete(id);
    ctx.helper.success({ ctx, res });
  }

}

module.exports = CategoriesController;
