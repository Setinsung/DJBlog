/* eslint valid-jsdoc: "off" */

'use strict';

// 导入userConfig
const userConfig = require('./config.user');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1681261932544_2249';

  // add your middleware config here
  config.middleware = [ 'errorhandler', 'auth' ];
  config.security = {
    csrf: false,
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {},
  };
  config.jwt = {
    secret: '1qaz',
  };
  config.auth = {
    urlWhiteList: [ '/web', '/admin/login', '/admin/logout' ]
      .map(item => userConfig.baseRouter + item),
    userWhiteList: [ userConfig.userName ],
  };

  config.onerror = {
    all(err, ctx) {
      ctx.body = 'error';
      ctx.status = 500;
    },
    html(err, ctx) {
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
