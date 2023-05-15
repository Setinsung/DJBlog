'use strict';

const Service = require('egg').Service;

class HomeService extends Service {

  async index() {
    const { ctx } = this;
    const data = await ctx.model.SiteConfig.Home.findOne({});
    return {
      data,
      msg: '首页配置信息获取成功',
    };

  }

  async create(params) {
    const { ctx } = this;

    const totalCount = await ctx.model.SiteConfig.Home.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.SiteConfig.Home.create(data);
      return {
        msg: '首页配置信息添加成功',
        data: res,
      };
    }
    return {
      msg: '首页配置信息已存在',
    };

  }

  async update(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '首页配置信息不存在',
      };
    }
    const homeInfo = await ctx.model.SiteConfig.Home.findOne({
      _id: params.id,
    });
    if (!homeInfo) {
      return {
        msg: '首页配置信息不存在',
      };
    }

    const updateFields = {
      ...params,
      updateTime: ctx.helper.moment(),
    };

    let res;
    try {
      // $set表示只更新传入的字段，不传入的字段不做修改
      res = await ctx.model.SiteConfig.Home.findByIdAndUpdate(
        { _id: params.id },
        { $set: updateFields },
        {
          new: true, // 返回修改后的数据
          runValidators: true, // 如果值为true，执行Validation验证。
        }
      );
    } catch (err) {
      return {
        msg: '首页配置信息修改失败',
      };
    }
    return {
      msg: '首页配置信息修改成功',
      data: res,
    };
  }

}

module.exports = HomeService;
