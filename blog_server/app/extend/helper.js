const bcrypt = require('bcrypt');
const dayjs = require('dayjs');

module.exports = {
  /** 获取当前时间戳
   * @return {number} 时间戳
   * */
  moment() {
    return dayjs().unix();
  },
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

  filterEmptyField(params) {
    const pam = {};
    for (const i in params) {
      if (params[i]) {
        if (i !== 'page' && i !== 'pageSize') {
          pam[i] = params[i];
        }
      }
    }
    return pam;
  },

  getTimeQueryCon(params) {
    const timeQuery = {};

    if (params.createStartTime && params.createEndTime) {
      timeQuery.createTime = {
        $gte: params.createStartTime,
        $lte: params.createEndTime,
      };
    }

    if (params.updateStartTime && params.updateEndTime) {
      timeQuery.updateTime = {
        $gte: params.updateStartTime,
        $lte: params.updateEndTime,
      };
    }
    return timeQuery;
  },

  getWhiteList(urlList) {
    return urlList.map(item => {
      if (item.includes('*')) {
        return new RegExp(`^${item.replace('*', '.*')}$`);
      }
      return item;
    });
  },
};
