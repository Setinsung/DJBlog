const helper = require('../extend/helper');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AdminSchema = new Schema(
    {
      username: {
        type: String,
        min: 5,
        max: 20,
        match: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
      },
      password: { type: String },
    },
    {
      collection: 'admin',
      versionKey: false,
    }
  );
  const AdminModel = mongoose.model('Admin', AdminSchema);
  // 开始时预设一个管理员账户
  const adminUser = {
    username: 'admin',
    password: '123456',
  };
  // 加密密码后创建
  helper.getSaltPassword(adminUser.password).then(async hash => {
    adminUser.password = hash;
    const resUser = await AdminModel.find({ username: adminUser.username });
    if (resUser.length === 0) {
      AdminModel.create(adminUser);
    }
  });
  return AdminModel;
};
