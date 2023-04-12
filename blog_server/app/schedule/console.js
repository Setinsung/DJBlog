module.exports = app => {
  return {
    schedule: {
      interval: '5s', // 5s间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true,
    },
    async task() {
      console.log('定时任务执行了');
    },
  };
};
