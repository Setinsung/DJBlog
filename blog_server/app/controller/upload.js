'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadFiles() {
    const { ctx, service } = this;
    const data = await service.upload.uploadFiles();
    console.log('--data', data);
    if (data) {
      ctx.body = data;
    } else {
      ctx.body = {
        msg: '上传失败',
      };
    }
  }
}

module.exports = UploadController;
