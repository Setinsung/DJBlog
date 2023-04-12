'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // 配置egg-validate校验规则
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};
