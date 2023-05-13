'use strict';

const Service = require('egg').Service;

class HfService extends Service {

  async index() {
    const { ctx } = this;
    const data = await ctx.model.Hf.findOne({});
    return {
      data,
      msg: '页头页脚配置信息获取成功',
    };

  }

  async create(params) {
    const { ctx } = this;

    const totalCount = await ctx.model.Hf.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.Hf.create(data);
      return {
        msg: '页头页脚配置信息添加成功',
        data: res,
      };
    }
    return {
      msg: '页头页脚配置信息已存在',
    };
  }

  async update(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '页头页脚配置信息不存在',
      };
    }
    const hfInfo = await ctx.model.Hf.findOne({
      _id: params.id,
    });
    if (!hfInfo) {
      return {
        msg: '页头页脚配置信息不存在',
      };
    }

    const updateFields = {
      ...params,
      updateTime: ctx.helper.moment(),
    };

    let res;
    try {
      res = await ctx.model.Hf.findByIdAndUpdate(
        { _id: params.id },
        { $set: updateFields },
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (err) {
      return {
        msg: '页头页脚配置信息修改失败',
      };
    }
    return {
      msg: '页头页脚配置信息修改成功',
      data: res,
    };
  }

}

module.exports = HfService;
