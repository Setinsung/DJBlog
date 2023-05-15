'use strict';

const Service = require('egg').Service;

class PersonalProfileService extends Service {

  async index() {
    const { ctx } = this;
    const data = await ctx.model.SiteConfig.Right.PersonalProfile.findOne({});
    return {
      data,
      msg: '个人简介配置信息获取成功',
    };
  }

  async create(params) {
    const { ctx } = this;

    const totalCount = await ctx.model.SiteConfig.Right.PersonalProfile.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment(),
      };
      const res = await ctx.model.SiteConfig.Right.PersonalProfile.create(data);
      return {
        msg: '个人简介配置信息添加成功',
        data: res,
      };
    }
    return {
      msg: '个人简介配置信息已存在',
    };
  }

  async update(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '个人简介配置信息不存在',
      };
    }
    const personalProfileInfo = await ctx.model.SiteConfig.Right.PersonalProfile.findOne({
      _id: params.id,
    });
    if (!personalProfileInfo) {
      return {
        msg: '个人简介配置信息不存在',
      };
    }

    const updateFields = {
      ...params,
      updateTime: ctx.helper.moment(),
    };

    let res;
    try {
      res = await ctx.model.SiteConfig.Right.PersonalProfile.findByIdAndUpdate(
        { _id: params.id },
        { $set: updateFields },
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (err) {
      return {
        msg: '个人简介配置信息修改失败',
      };
    }
    return {
      msg: '个人简介配置信息修改成功',
      data: res,
    };
  }

}

module.exports = PersonalProfileService;
