'use strict';

const Service = require('egg').Service;

class CategoriesService extends Service {

  async index(params) {
    const { ctx } = this;
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;
    const query = {};
    if (params.name) {
      query.name = new RegExp(params.name, 'i');
    }

    const countPromise = ctx.model.Categories.countDocuments(query);
    const tagsPromise = ctx.model.Categories
      .find(query)
      .sort({ createTime: -1 })
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

  async create(params) {
    const { ctx } = this;
    const findItem = await ctx.model.Categories.findOne({
      name: params.name,
    });
    if (findItem) {
      return {
        msg: '分类已存在',
      };
    }
    const newItem = {
      ...params,
      createTime: ctx.helper.moment(),
    };

    const res = await ctx.model.Categories.create(newItem);
    return {
      msg: '分类添加成功',
      data: res,
    };
  }

  async update(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '分类不存在',
      };
    }
    const tag = await ctx.model.Categories.findOne({
      _id: params.id,
    });
    if (!tag) {
      return {
        msg: '分类不存在',
      };
    }

    const duplicateName = await ctx.model.Categories.findOne({
      _id: { $ne: params.id },
      name: params.name,
    });
    if (duplicateName) {
      return {
        msg: '分类已存在，请重新修改',
      };
    }

    const updateFields = {};
    if (params.name !== tag.name) {
      updateFields.name = params.name;
    }
    updateFields.updateTime = ctx.helper.moment();

    try {
      await ctx.model.Categories.updateOne(
        { _id: params.id },
        { $set: updateFields }
      );
    } catch (err) {
      // console.log(err);
      return {
        msg: '分类修改失败',
      };
    }
    return {
      msg: '分类修改成功',
    };
  }

  async updateStatus(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '分类不存在',
      };
    }
    const tag = await ctx.model.Categories.findOne({
      _id: params.id,
    });
    if (!tag) {
      return {
        msg: '分类不存在',
      };
    }
    const tagStatus = params.status;
    try {
      await ctx.model.Categories.updateOne(
        {
          _id: params.id,
        },
        {
          $set: {
            status: tagStatus,
            updateTime: ctx.helper.moment(),
          },
        }
      );
    } catch (err) {
      return {
        msg: '分类状态修改失败',
      };
    }
    return {
      msg: `分类${tagStatus === 1 ? '启用' : '禁用'}成功`,
    };
  }

  async delete(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '分类不存在',
      };
    }
    const tag = await ctx.model.Categories.findOne({
      _id: id,
    });
    if (!tag) {
      return {
        msg: '分类不存在',
      };
    }

    try {
      await ctx.model.Categories.deleteOne({
        _id: id,
      });
    } catch (err) {
      return {
        msg: '分类删除失败',
      };
    }
    return {
      msg: '分类删除成功',
    };
  }

}

module.exports = CategoriesService;
