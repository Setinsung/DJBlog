const bcrypt = require('bcrypt');


module.exports = {
  /** 密码加密
   * @param {string} password 原始密码
   * @return {string} hash
   */
  getSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) {
            resolve(hash);
          } else {
            reject(err);
          }
        });
      });
    });
  },

  /** 密码匹配
   * @param {string} _password 未加密的密码
   * @param {string} password 数据库存储的加密密码
   * @return {boolean} 是否匹配
   */
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  },


  /** 通用success处理
   * @param {*} { ctx, res = null }
   */
  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0代表成功，其它代表失败
      msg: res.msg ? res.msg : '请求成功',
    };
  },
};
