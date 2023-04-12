'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async adminLogin(body) {
    const { ctx } = this;
    // const res = await ctx.model.Admin.find({});
    const res = await ctx.model.Admin.create(body);
    console.log('res---', res);
  }
}

module.exports = AdminService;
