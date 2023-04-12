'use strict';

const Controller = require('egg').Controller;

class PostsController extends Controller {
  constructor(ctx) {
    super(ctx);
    // 校验规则
    this.createRule = {
      username: {
        type: 'email',
      },
      password: {
        type: 'password',
        compare: 're-password',
      },
    };
  }
  async index() {
    const { ctx } = this;
    console.log('api');
    ctx.body = ctx.query.name;
  }
  async create() {
    const { ctx } = this;
    // 使用校验规则
    ctx.validate(this.createRule);

    ctx.body = ctx.request.body;
  }

  async file() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    console.log(file);
  }
}

module.exports = PostsController;
