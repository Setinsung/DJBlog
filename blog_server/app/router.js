'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /* router.get('/:id', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/file', controller.posts.file);
  // Restful方式定义路由，这样定义其中的方法只需遵循固定名，就都可请求到
  router.resources('posts', '/api/posts', controller.posts); */

  router.post('/admin/login', controller.admin.adminLogin);

};
