module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AboutSchema = new Schema(
    {
      imgs: [
        {
          imgUrl: { type: 'string', default: '' },
          link: { type: 'string', default: '', required: false },
        },
      ],
      desc: {
        type: 'string',
        min: 1,
        max: 800,
      },
      tags: [ String ],
      createTime: {
        type: 'number',
        default: 0,
      },
      updateTime: {
        type: 'number',
        default: 0,
      },
      showResume: {
        type: 'boolean',
        default: false,
      },
    },
    {
      collection: 'about',
      versionKey: false,
    }
  );
  // 这里的model第一个参数就是ctx.model.后面的名字
  return mongoose.model('About', AboutSchema);
};
