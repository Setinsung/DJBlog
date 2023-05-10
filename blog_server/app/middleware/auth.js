module.exports = () => {
  // 这里进行鉴权
  return async function auth(ctx, next) {
    const currentUrl = ctx.request.url;
    const urlWhiteList = ctx.app.config.auth.urlWhiteList;
    const whiteList = ctx.app.config.auth.whiteList;
    // 放行白名单接口
    const isNoValidate = urlWhiteList.some(item => currentUrl.indexOf(item) > -1);
    if (isNoValidate) {
      return await next();
    }
    const authorization = ctx.request.header.authorization;
    if (!authorization) {
      ctx.helper.success({
        ctx,
        res: {
          status: 401,
          msg: '无权限访问',
        },
      });
      return;
    }
    const token = authorization.split(' ')[1];
    try {
      const decode = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      if (!whiteList.includes(decode._doc.username)) {
        ctx.helper.success({
          ctx,
          res: {
            status: 403,
            msg: '无权限访问',
          },
        });
        return;
      }
      await next();
    } catch (err) {
      ctx.helper.success({
        ctx,
        res: {
          status: 403,
          msg: '无权限访问',
        },
      });
      return;
    }


  };
};
