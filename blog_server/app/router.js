'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter;
  const baseWebRouter = app.config.baseWebRouter;
  // 重定向到swagger
  router.redirect('/', '/swagger-ui.html', 302);

  router.get('/', controller.home.index);

  // 前台 /web
  // 标签展示
  router.get(baseWebRouter + '/tags', controller.tags.index);
  // 分类展示
  router.get(baseWebRouter + '/categories', controller.categories.index);
  // 关于展示
  router.get(baseWebRouter + '/about', controller.about.index);
  // 评论展示
  router.get(baseWebRouter + '/comment', controller.comments.index);
  // 文章展示
  router.get(baseWebRouter + '/articles', controller.articles.index);
  // 文章详情
  router.get(baseWebRouter + '/articles/:id', controller.articles.show);
  // 网页配置
  router.get(baseWebRouter + '/config/home', controller.siteConfig.home.index);
  router.get(baseWebRouter + '/config/hf', controller.siteConfig.hf.index);
  router.get(baseWebRouter + '/config/right/introduction', controller.siteConfig.right.personalProfile.index);
  router.get(baseWebRouter + '/config/right/ad', controller.siteConfig.right.ad.index);
  router.get(baseWebRouter + '/config/right/recommend', controller.siteConfig.right.recommend.index);


  // 后台 /api
  // 登录/退出
  router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
  router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);

  // 上传文件
  router.post(baseRouter + '/upload', jwt, controller.upload.uploadFiles);

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
  router.resources('user', baseRouter + '/user', jwt, controller.user);

  // 评论
  router.resources('comment', baseRouter + '/comment', jwt, controller.comments);

  // 网页配置 - 首页
  router.resources('home', baseRouter + '/config/home', jwt, controller.siteConfig.home);
  // 网页配置 - 页头页脚
  router.resources('hf', baseRouter + '/config/hf', jwt, controller.siteConfig.hf);
  // 网页配置 - 侧栏配置
  router.resources('personalProfile', baseRouter + '/config/right/introduction', jwt, controller.siteConfig.right.personalProfile);
  router.resources('ad', baseRouter + '/config/right/ad', jwt, controller.siteConfig.right.ad);
  router.resources('recommend', baseRouter + '/config/right/recommend', jwt, controller.siteConfig.right.recommend);
};
