module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema({
    username: { type: String },
    password: { type: String },
  },
  {
    // 注意这里的collection，如果不写，会自动变成复数形式，就找不到了。
    collection: 'admin',
    // 同时不加修改版本_v
    versionKey: false,
  });

  return mongoose.model('Admin', AdminSchema);
  // 或者是直接用 return mongoose.model('Admin', AdminSchema, 'admin');
};
