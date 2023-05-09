'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const baseRouter = app.config.baseRouter;// /api/vi
  router.get('/', controller.home.index);

  router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
  router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);
  // 对tags直接使用RESTful风格的路由
  router.resources('tags', baseRouter + '/tags', controller.tags);
  router.put(baseRouter + '/tags/status/:id', controller.tags.updateStatus);
};
