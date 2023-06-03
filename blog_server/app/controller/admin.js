'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 管理员
 * @description 管理员登录退出
 */
class AdminController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      userName: {
        type: 'string',
        min: 5,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
      },
      password: {
        type: 'password',
        // compare: 're-password',
        min: 6,
        max: 20,
        format: /^[A-Za-z0-9_]{6,20}$/,
      },
    };
  }
  /**
   * @summary 管理员登录
   * @description 管理员输入用户名和密码进行登录
   * @router post /api/v1/admin/login
   * @request body adminLoginRequest *body
   */
  async adminLogin() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    console.log('data', data);
    ctx.validate(this.createRule, data);
    const res = await service.admin.adminLogin(data);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 管理员退出
   * @description 管理员退出
   * @router post /api/v1/admin/logout
   */
  async adminLogout() {
    const { ctx, service } = this;
    const res = await service.admin.adminLogout();
    ctx.helper.success({ ctx, res });
  }
}

module.exports = AdminController;
