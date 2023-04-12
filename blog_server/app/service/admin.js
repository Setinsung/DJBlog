'use strict';


const Service = require('egg').Service;

class AdminService extends Service {
  async adminLogin(params) {
    const { ctx } = this;
    const resUser = await ctx.model.Admin.findOne({
      username: params.userName,
    });
    if (!resUser) {
      return {
        msg: '用户名或密码错误',
      };
    }
    const isMatch = await ctx.helper.comparePassword(params.password, resUser.password);
    if (!isMatch) {
      return {
        msg: '用户名或密码错误',
      };
    }
    console.log(isMatch);
  }
}

module.exports = AdminService;
