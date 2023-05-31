module.exports = () => {
  return {
    schedule: {
      // cron: '0 */30 * * * *', // 每30分钟执行一次
      interval: '10s',
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      const res = await ctx.service.comments.autoAudit();
      if (res && res.msg) {
        ctx.logger.info(res.msg);
      }
    },
  };
};
