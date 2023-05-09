'use strict';


const Service = require('egg').Service;

class AdminService extends Service {
  async adminLogin(params) {
    const { ctx, app } = this;
    const resUser = await ctx.model.Admin.findOne({
      username: params.userName,
    });
    if (!resUser) {
      return {
        msg: '用户名或密码错误',
      };
    }
    // 匹配密码
    const isMatch = await ctx.helper.comparePassword(params.password, resUser.password);
    if (!isMatch) {
      return {
        msg: '用户名或密码错误',
      };
    }
    // 成功登录后，生成token
    const token = app.jwt.sign({ ...resUser }, app.config.jwt.secret, { expiresIn: '1h' });
    // 直接放到cookie中，httpOnly为true表示只有服务器端可以获取cookie
    ctx.cookies.set('token', token, {
      maxAge: 86400000,
      httpOnly: true,
    });
    // 返回token和username
    return {
      data: {
        token,
        userName: resUser.username,
      },
      msg: '登录成功',
    };
  }

  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set('token', '', {
      maxAge: 0,
    });

    return {
      msg: '退出成功',
    };
  }
}

module.exports = AdminService;
