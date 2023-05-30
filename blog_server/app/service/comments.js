'use strict';

const Service = require('egg').Service;

class CommentsService extends Service {

  async index(params) {
    console.log('index params', params);
    const { ctx } = this;
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;
    params.auditStatus = parseInt(params.auditStatus, 10) || 0;
    const necessaryCon = {
      ...(params.auditStatus !== 0 && { auditStatus: params.auditStatus }),
    };

    const fuzzyCon = params.articleTitle ? { articleTitle: new RegExp(params.articleTitle, 'i') } : {};

    const query = {
      $and: [
        necessaryCon,
        fuzzyCon,
      ],
    };
    console.log('query', query);
    const countPromise = ctx.model.Comments.countDocuments(query);
    const listPromise = ctx.model.Comments
      .find(query)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
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
    const newItem = {
      ...params,
      commentTime: ctx.helper.moment(),
    };
    const res = await ctx.model.Comments.create(newItem);
    // TODO 更新文章评论数量
    await ctx.model.Articles.updateOne({
      _id: params.articleId,
    }, {
      $inc: { comment: 1 },
    });
    return {
      msg: '评论添加成功',
      data: res,
    };
  }

  async update(params) {
    console.log('update params', params);
    const { ctx } = this;
    params.auditStatus = parseInt(params.auditStatus, 10) || 0;
    params.id = parseInt(params.id, 10) || 0;
    /* // 先对ObjectId进行校验避免异常
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '评论不存在',
      };
    } */
    const updateFields = {
      auditStatus: params.auditStatus,
      updateTime: ctx.helper.moment(),
    };

    if (params.id === 0) {
      await ctx.model.Comments.updateMany(
        {},
        { $set: updateFields }
      );
      return {
        msg: `评论${params.auditStatus === 1 ? '审核通过' : '审核驳回'}成功`,
      };
    }
    const comment = await ctx.model.Comments.findOne({
      _id: params.id,
    });
    if (!comment) {
      return {
        msg: '评论不存在',
      };
    }

    try {
      // $set表示只更新传入的字段，不传入的字段不做修改
      await ctx.model.Comments.updateOne(
        { _id: params.id },
        { $set: updateFields }
      );
    } catch (err) {
      // console.log(err);
      return {
        msg: '评论修改失败',
      };
    }
    return {
      msg: '评论修改成功',
    };
  }

  async delete(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '评论不存在',
      };
    }
    const delItem = await ctx.model.Comments.findOne({
      _id: id,
    });
    if (!delItem) {
      return {
        msg: '评论不存在',
      };
    }

    try {
      await ctx.model.Comments.deleteOne({
        _id: id,
      });
      // TODO 更新文章评论数量
      await ctx.model.Articles.updateOne({
        _id: delItem.articleId,
      }, {
        $inc: { comment: -1 },
      });
    } catch (err) {
      // console.log(err);
      return {
        msg: '评论删除失败',
      };
    }
    return {
      msg: '评论删除成功',
    };
  }

}

module.exports = CommentsService;
