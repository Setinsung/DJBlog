/* eslint-disable jsdoc/check-tag-names */
'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
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
      nickName: {
        type: 'string',
        required: false,
        max: 20,
        allowEmpty: true,
      },
    };
  }

  /**
   * @summary 获取用户列表
   * @description 获取用户列表
   * @router get /api/v1/user
   * @request query string page 页码
   * @request query string pageSize 每页数量
   * @request query string nickName 昵称
   * @Jwt
   */
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryRule, data);
    const res = await service.user.index(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 删除用户
   * @description 删除用户
   * @router delete /api/v1/user/{id}
   * @request path string *id
   * @Jwt
   */
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.user.delete(id);
    ctx.helper.success({ ctx, res });
  }

}

module.exports = UserController;
