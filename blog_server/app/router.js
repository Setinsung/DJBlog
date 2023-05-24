'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter;
  router.get('/', controller.home.index);
  // 前台 /web

  // 登录
  router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
  router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);

  // 一键开启关闭收藏
  router.put(baseRouter + '/articles/collectStatus', jwt, controller.articles.changeCollectStatus);
  // 文章
  router.resources('articles', baseRouter + '/articles', jwt, controller.articles);
  // 启用/禁用
  router.put(baseRouter + '/articles/status/:id', jwt, controller.articles.changeStatus);
  // 修改发布状态
  router.put(baseRouter + '/articles/publishStatus/:id', jwt, controller.articles.changePublishStatus);


  // 标签
  router.resources('tags', baseRouter + '/tags', jwt, controller.tags);
  router.put(baseRouter + '/tags/status/:id', jwt, controller.tags.updateStatus);

  // 分类
  router.resources('categories', baseRouter + '/categories', jwt, controller.categories);

  // 关于
  router.resources('about', baseRouter + '/about', jwt, controller.about);

  // 用户
  router.resources('user', baseRouter + '/user', controller.user);

  // 网页配置 - 首页
  router.resources('home', baseRouter + '/config/home', jwt, controller.siteConfig.home);
  // 网页配置 - 页头页脚
  router.resources('hf', baseRouter + '/config/hf', jwt, controller.siteConfig.hf);
  // 网页配置 - 侧栏配置
  router.resources('personalProfile', baseRouter + '/config/right/introduction', jwt, controller.siteConfig.right.personalProfile);
  router.resources('ad', baseRouter + '/config/right/ad', jwt, controller.siteConfig.right.ad);
  router.resources('recommend', baseRouter + '/config/right/recommend', jwt, controller.siteConfig.right.recommend);
};
