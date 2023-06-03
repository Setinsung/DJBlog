/* eslint-disable jsdoc/check-tag-names */
'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 评论管理
 */
class CommentsController extends Controller {
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
      articleTitle: {
        type: 'string',
        required: false,
      },
      auditStatus: {
        type: 'string',
        required: false,
        default: '0',
      },
    };

    this.updateAuditStatusRule = {
      auditStatus: {
        type: 'number',
      },
    };
  }

  async showComments() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryRule, data);
    const res = await service.comments.index(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 获取评论列表
   * @description 获取评论列表
   * @router get /api/v1/comment
   * @request query string page 页码
   * @request query string pageSize 每页数量
   * @request query string articleTitle 文章标题
   * @request query string auditStatus 审核状态
   * @Jwt
   */
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryRule, data);
    const res = await service.comments.index(data);
    ctx.helper.success({ ctx, res });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.comments.create(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 更新评论审核状态
   * @description 更新评论审核状态
   * @router put /api/v1/comment/{id}
   * @request path string *id
   * @request body updateAuditStatusRequest *body
   * @Jwt
   */
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.updateAuditStatusRule, data);
    const res = await service.comments.update({
      id,
      auditStatus: data.auditStatus,
    });
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 删除评论
   * @description 删除评论
   * @router delete /api/v1/comment/{id}
   * @request path string *id
   * @Jwt
   */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.comments.delete(id);
    ctx.helper.success({ ctx, res });
  }

}

module.exports = CommentsController;
