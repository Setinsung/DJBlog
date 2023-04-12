'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    const { serverUrl, limit } = this.config.news;
    const res = await this.ctx.curl(`${serverUrl}?limit=${limit}`, {
      dataType: 'json',
    });
    console.log('res', res.data.data);
    return res.data.data;
  }
}

module.exports = NewsService;
