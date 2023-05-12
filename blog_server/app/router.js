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
  // 标签
  router.resources('tags', baseRouter + '/tags', jwt, controller.tags);
  router.put(baseRouter + '/tags/status/:id', jwt, controller.tags.updateStatus);
  // 分类
  router.resources('categories', baseRouter + '/categories', jwt, controller.categories);
  // 关于
  router.resources('about', baseRouter + '/about', jwt, controller.about);
};
