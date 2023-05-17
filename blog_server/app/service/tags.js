'use strict';

const Service = require('egg').Service;

class TagsService extends Service {

  async index(params) {
    const { ctx } = this;
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;
    // name为可选参数，如果有name则进行模糊查询
    const query = {};
    if (params.name) {
      query.name = new RegExp(params.name, 'i'); // i表示不区分大小写
    }

    const countPromise = ctx.model.Tags.countDocuments(query);
    // 使用lean()方法可以将mongoose返回的Document对象转换成普通的JS对象，减少因为mongoose对象的包装导致的性能损耗
    const listPromise = ctx.model.Tags
      .find(query)
      .sort({ createTime: -1 })
      .skip((page - 1) * params.pageSize)
      .limit(pageSize)
      .lean()
      .exec();
    // 这里使用Promise.all()方法，并行执行两个查询，提高查询效率
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
    // 先查询是否有重复，如果有重复，则不添加
    const findItem = await ctx.model.Tags.findOne({
      name: params.name,
    });
    if (findItem) {
      return {
        msg: '标签已存在',
      };
    }
    const newItem = {
      ...params,
      createTime: ctx.helper.moment(),
    };

    const res = await ctx.model.Tags.create(newItem);
    return {
      msg: '标签添加成功',
      data: res,
    };
  }

  async update(params) {
    const { ctx, app } = this;
    // 先对ObjectId进行校验避免异常
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '标签不存在',
      };
    }
    const tag = await ctx.model.Tags.findOne({
      _id: params.id,
    });
    if (!tag) {
      return {
        msg: '标签不存在',
      };
    }

    // 修改后不能和其余的相同，注意排除自身
    const duplicateName = await ctx.model.Tags.findOne({
      _id: { $ne: params.id },
      name: params.name,
    });
    if (duplicateName) {
      return {
        msg: '标签已存在，请重新修改',
      };
    }

    const updateFields = {};
    if (params.name !== tag.name) {
      updateFields.name = params.name;
    }
    updateFields.updateTime = ctx.helper.moment();

    try {
      // $set表示只更新传入的字段，不传入的字段不做修改
      await ctx.model.Tags.updateOne(
        { _id: params.id },
        { $set: updateFields }
      );
    } catch (err) {
      // console.log(err);
      return {
        msg: '标签修改失败',
      };
    }
    return {
      msg: '标签修改成功',
    };
  }

  async updateStatus(params) {
    const { ctx, app } = this;
    // 先对ObjectId进行校验避免异常
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '标签不存在',
      };
    }
    const tag = await ctx.model.Tags.findOne({
      _id: params.id,
    });
    if (!tag) {
      return {
        msg: '标签不存在',
      };
    }
    const tagStatus = params.status;
    try {
      await ctx.model.Tags.updateOne(
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
      // console.log(err);
      return {
        msg: '标签状态修改失败',
      };
    }
    return {
      msg: `标签${tagStatus === 1 ? '启用' : '禁用'}成功`,
    };
  }

  async delete(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '标签不存在',
      };
    }
    const delItem = await ctx.model.Tags.findOne({
      _id: id,
    });
    if (!delItem) {
      return {
        msg: '标签不存在',
      };
    }

    try {
      await ctx.model.Tags.deleteOne({
        _id: id,
      });
    } catch (err) {
      // console.log(err);
      return {
        msg: '标签删除失败',
      };
    }
    return {
      msg: '标签删除成功',
    };
  }

}

module.exports = TagsService;
