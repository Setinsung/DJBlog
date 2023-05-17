'use strict';

const Service = require('egg').Service;

class RecommendService extends Service {

  async index(params) {
    const { ctx } = this;
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;
    const query = {};
    if (params.project) {
      query.project = params.project;
    }
    const countPromise = ctx.model.SiteConfig.Right.Recommend.countDocuments(query);
    const listPromise = ctx.model.SiteConfig.Right.Recommend
      .find(query)
      .sort({ createTime: -1 })
      .skip((page - 1) * params.pageSize)
      .limit(pageSize)
      .lean()
      .exec();
    const [ totalCount, list ] = await Promise.all([ countPromise, listPromise ]);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list,
      },
    };
  }

  async create(params) {
    const { ctx } = this;
    const findItem = await ctx.model.SiteConfig.Right.Recommend.findOne({
      name: params.name,
    });
    if (findItem) {
      return {
        msg: '推荐配置信息已存在',
      };
    }
    const newItem = {
      ...params,
      createTime: ctx.helper.moment(),
    };

    const res = await ctx.model.SiteConfig.Right.Recommend.create(newItem);
    return {
      msg: '推荐配置信息添加成功',
      data: res,
    };
  }

  async update(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '推荐配置信息不存在',
      };
    }
    const adInfo = await ctx.model.SiteConfig.Right.Recommend.findOne({
      _id: params.id,
    });
    if (!adInfo) {
      return {
        msg: '推荐配置信息不存在',
      };
    }

    const updateFields = {
      ...params,
      updateTime: ctx.helper.moment(),
    };

    let res;
    try {
      res = await ctx.model.SiteConfig.Right.Recommend.findByIdAndUpdate(
        { _id: params.id },
        { $set: updateFields },
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (err) {
      return {
        msg: '推荐配置信息修改失败',
      };
    }
    return {
      msg: '推荐配置信息修改成功',
      data: res,
    };
  }

  async delete(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '推荐配置信息不存在',
      };
    }
    const delItem = await ctx.model.SiteConfig.Right.Recommend.findOne({
      _id: id,
    });
    if (!delItem) {
      return {
        msg: '推荐配置信息不存在',
      };
    }

    try {
      await ctx.model.SiteConfig.Right.Recommend.deleteOne({
        _id: id,
      });
    } catch (err) {
      return {
        msg: '推荐配置信息删除失败',
      };
    }
    return {
      msg: '推荐配置信息删除成功',
    };
  }

}

module.exports = RecommendService;
