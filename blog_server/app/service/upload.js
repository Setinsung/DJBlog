const path = require('path');
const qiniu = require('qiniu');
const md5 = require('md5');
const Service = require('egg').Service;


class UploadService extends Service {
  constructor(ctx) {
    super(ctx);
    const { app } = this;
    // 参数解释： https://developer.qiniu.com/kodo/1206/put-policy
    this.mac = new qiniu.auth.digest.Mac(
      app.config.qiniu.accessKey,
      app.config.qiniu.secretKey
    );
    this.config = new qiniu.conf.Config();
    this.config.zone = qiniu.zone.Zone_z0;
    this.formUploader = new qiniu.form_up.FormUploader(this.config);
    this.putExtra = new qiniu.form_up.PutExtra();
    this.options = {
      scope: app.config.qiniu.bucket,
      expires: 7200,
      force: true,
      callbackBodyType: 'application/json',
    };
    this.putPolicy = new qiniu.rs.PutPolicy(this.options);
    this.uploadToken = this.putPolicy.uploadToken(this.mac);
  }

  async uploadFiles() {
    const { ctx } = this;
    const parts = ctx.multipart();
    const files = [];
    for await (const stream of parts) {
      const file = await this.uploadToQiniu(stream);
      if (file) {
        files.push(file);
      }
    }
    return files;
  }

  async uploadToQiniu(stream) {
    const { app } = this;
    const timestamp = new Date().getTime(); // 当前时间戳
    const randomNum = Math.ceil(Math.random() * 1000); // 取1000以下的随机数
    try {
      const extname = path.extname(stream.filename).toLocaleLowerCase();
      const filename =
        md5(path.basename(stream.filename, extname) + timestamp + randomNum) +
        extname;
      const result = await new Promise((resolve, reject) => {
        this.formUploader.putStream(
          this.uploadToken,
          filename,
          stream,
          this.putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject(respErr);
            }
            if (respInfo.statusCode === 200) {
              resolve({
                ...respBody,
                url: app.config.qiniu.cdn + respBody.key,
              });
            } else {
              reject(respBody);
            }
          }
        );
      });
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}


module.exports = UploadService;

