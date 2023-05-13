'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async index(params) {
    const { ctx } = this;
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;
    const query = {};
    if (params.nickName) {
      query.nickName = new RegExp(params.nickName, 'i');
    }
    const countPromise = ctx.model.User.countDocuments(query);
    const tagsPromise = ctx.model.User
      .find(query)
      .sort({ loginTime: -1 })
      .skip((page - 1) * params.pageSize)
      .limit(pageSize)
      .lean()
      .exec();
    const [ totalCount, list ] = await Promise.all([ countPromise, tagsPromise ]);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list,
      },
    };

  }

  async delete(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '用户不存在',
      };
    }
    const delItem = await ctx.model.User.findOne({
      _id: id,
    });
    if (!delItem) {
      return {
        msg: '用户不存在',
      };
    }

    try {
      await ctx.model.User.deleteOne({
        _id: id,
      });
    } catch (err) {
      // console.log(err);
      return {
        msg: '用户删除失败',
      };
    }
    return {
      msg: '用户删除成功',
    };
  }

}

module.exports = UserService;
