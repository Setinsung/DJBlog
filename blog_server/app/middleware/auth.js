module.exports = () => {
  // 这里进行鉴权
  return async function auth(ctx, next) {
    const currentUrl = ctx.request.url;
    const urlWhiteList = ctx.app.config.auth.urlWhiteList;
    const userWhiteList = ctx.app.config.auth.userWhiteList;
    // 放行白名单接口
    const isNoValidate = urlWhiteList.includes(currentUrl);
    if (isNoValidate) {
      return await next();
    }
    const authorization = ctx.request.header.authorization;
    // console.log('authorization', authorization);
    if (!authorization) {
      ctx.throw(403, '无权限访问');
    }
    const token = authorization.split(' ')[1];
    try {
      const decode = await ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      if (!userWhiteList.includes(decode._doc.username)) {
        ctx.throw(403, '无权限访问');
      }
      // ctx.state.user = decode._doc;
      await next();
    } catch (err) {
      ctx.throw(401, 'token无效或过期');
    }
  };
};
