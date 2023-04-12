'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async adminLogin() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const res = await service.admin.adminLogin(body);
    ctx.body = res;
  }
}

module.exports = AdminController;
