'use strict';

const Service = require('egg').Service;

class AboutService extends Service {

  async index() {
    const { ctx } = this;
    const data = await ctx.model.About.findOne({});
    return {
      data,
      msg: '关于信息获取成功',
    };
  }

  async showAbout() {
    const { ctx } = this;
    const data = await ctx.model.About.findOne({}, { createTime: 0, updateTime: 0 });
    return {
      data,
      msg: '关于信息获取成功',
    };
  }

  async create(params) {
    const { ctx } = this;

    const totalCount = await ctx.model.About.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.About.create(data);
      return {
        msg: '关于信息添加成功',
        data: res,
      };
    }
    return {
      msg: '关于信息已存在',
    };

  }

  async update(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '关于信息不存在',
      };
    }
    const aboutInfo = await ctx.model.About.findOne({
      _id: params.id,
    });
    if (!aboutInfo) {
      return {
        msg: '关于信息不存在',
      };
    }

    const updateFields = {
      ...params,
      updateTime: ctx.helper.moment(),
    };

    let res;
    try {
      // $set表示只更新传入的字段，不传入的字段不做修改
      res = await ctx.model.About.findByIdAndUpdate(
        { _id: params.id },
        { $set: updateFields },
        {
          new: true, // 返回修改后的数据
          runValidators: true, // 如果值为true，执行Validation验证。
        }
      );
    } catch (err) {
      return {
        msg: '标签修改失败',
      };
    }
    return {
      msg: '标签修改成功',
      data: res,
    };
  }

}

module.exports = AboutService;
