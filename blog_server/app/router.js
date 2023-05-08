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
};
