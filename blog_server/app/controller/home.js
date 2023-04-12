'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {

  async index() {
    const { ctx, config } = this;
    console.log('config', config.env);
    // console.log('ctx.request', ctx.request);
    // console.log('ctx.request', ctx.query);
    // console.log('ctx.request', ctx.params);
    ctx.body = 'hi, egg';
    await this.app.runSchedule('console');
  }
}

module.exports = HomeController;
