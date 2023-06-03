'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller 测试
 */
class HomeController extends Controller {
  /**
  * @summary 接口测试
  * @description 测试swagger文档是否可用
  * @router get /home
  * @request query string str 随机字符串
  * @response 200 homeResponse
  */
  async index() {
    const { ctx } = this;
    const str = ctx.query.str;
    ctx.body = {
      message: 'swagger 测试正常!!! url传参是:' + str,
    };
  }
}

module.exports = HomeController;
