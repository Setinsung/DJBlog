/* eslint-disable jsdoc/check-tag-names */
'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 标签管理
 */
class TagsController extends Controller {
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

    this.statusRule = {
      status: {
        type: 'boolean',
        required: true,
      },
    };
  }

  /**
   * @summary 展示标签列表
   * @description 前台展示标签列表
   * @router get /web/v1/tags
   * @request query string name 标签名称
   */
  async showTags() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.webQueryRule, data);
    const res = await service.tags.showTags(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 获取标签列表
   * @description 获取标签列表
   * @router get /api/v1/tags
   * @request query string name 标签名称
   * @request query string page 页码
   * @request query string pageSize 每页数量
   * @Jwt
   */
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryRule, data);
    const res = await service.tags.index(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 创建标签
   * @description 创建标签
   * @router post /api/v1/tags
   * @request body createTagRequest *body
   * @Jwt
   */
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.tags.create(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 更新标签
   * @description 更新标签
   * @router put /api/v1/tags/{id}
   * @request path string *id
   * @request body updateTagRequest *body
   * @Jwt
   */
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.tags.update({
      id,
      name: data.name,
    });
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 更新标签状态
   * @description 更新标签状态
   * @router put /api/v1/tags/{id}/status
   * @request path string *id
   * @request body updateTagStatusRequest *body
   * @Jwt
   */
  async updateStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    console.log('data', data);
    ctx.validate(this.statusRule, data);
    const res = await service.tags.updateStatus({
      id,
      status: data.status,
    });
    ctx.helper.success({ ctx, res });
  }
  /**
   * @summary 删除标签
   * @description 删除标签
   * @router delete /api/v1/tags/{id}
   * @request path string *id
   * @Jwt
   */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.tags.delete(id);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = TagsController;
