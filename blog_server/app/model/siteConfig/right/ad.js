module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;


  const ImgSchema = new Schema(
    {
      imgUrl: {
        type: 'string',
      },
      link: {
        type: 'string',
      },
    }
  );

  const AdSchema = new Schema(
    {
      imgs: {
        type: [ ImgSchema ],
        min: 1,
        max: 3,
      },
      showPosition: {
        type: [ String ],
        min: 1,
        max: 10,
      },
      createTime: {
        type: 'number',
        default: 0,
      },
      updateTime: {
        type: 'number',
        default: 0,
      },
    },
    {
      collection: 'advertisement',
      versionKey: false,
    }
  );
  return mongoose.model('Ad', AdSchema);
};
