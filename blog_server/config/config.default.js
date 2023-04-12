/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.keys = appInfo.name + '_1680596691178_7268';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  // 不属于框架的，属于自己的配置
  const userConfig = {
    // myAppName: 'egg',
    news: {
      limit: 5,
      serverUrl: 'https://cnodejs.org/api/v1/topics',
    },
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.security = {
    csrf: false,
    // domainWhiteList: [ 'http://localhost:7001' ],
  };
  // 文件
  config.multipart = {
    mode: 'file',
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {},
  };
  return {
    ...config,
    ...userConfig,
  };
};
