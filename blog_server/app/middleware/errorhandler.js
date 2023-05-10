// app/middleware/errorhandler.js
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发 error 事件，记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      console.log('err', err.message);

      // 生产环境时 500 错误的详细错误内容不返回给客户端
      const error =
        status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;

      ctx.helper.success({
        ctx,
        res: {
          msg: error,
          code: 0,
          data: null,
        },
      });
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
