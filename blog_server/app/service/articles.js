'use strict';

const Service = require('egg').Service;

class ArticlesService extends Service {

  async updateCategoriesArticleNum() {
    const { ctx } = this;
    const aggCursor = ctx.model.Categories.aggregate([
      {
        $lookup: {
          from: 'articles',
          localField: 'name',
          foreignField: 'categories',
          as: 'articles',
        },
      },
      {
        $match: {
          'articles.status': 1,
          'articles.publishStatus': 1,
        },
      },
      {
        $project: {
          name: 1,
          articleNum: { $size: '$articles' },
        },
      },
    ]);
    // for await...of是ES2018引入的新语法。它允许你迭代异步可迭代对象，因为forEach在处理异步操作时表现不佳，所以通常使用for await...of。注意由于for await...of是异步迭代器，因此需要在循环中使用await关键字等待每个异步操作完成。
    for await (const item of aggCursor) {
      await ctx.model.Categories.updateOne(
        { name: item.name },
        { $set: { articleNum: item.articleNum } }
      );
    }
  }

  async updateTagsArticleNum() {
    const { ctx } = this;
    // 先将所有标签的文章数量置为0
    await ctx.model.Tags.updateMany({}, { $set: { articleNum: 0 } });
    // 使用聚合管道查询每个标签下符合条件的文章数量
    const pipeline = [
      {
        $match: {
          status: 1,
          publishStatus: 1,
        },
      },
      // $unwind: 展开数组字段 tags，使得后续的 $group 操作可以统计每个标签出现的次数。
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          articleNum: { $sum: 1 },
        },
      },
    ];
    const results = await ctx.model.Articles.aggregate(pipeline).exec();
    // console.log('results', results);
    if (results && results.length > 0) {
      // 构造批量更新操作数组
      const bulkOps = results.map(result => ({
        updateOne: {
          filter: { name: result._id },
          update: { articleNum: result.articleNum },
        },
      }));
      // 执行批量更新操作
      await ctx.model.Tags.bulkWrite(bulkOps, { ordered: false });
    }
  }

  async index(params) {
    // console.log('params index', params);
    const { ctx } = this;
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;
    params.status = parseInt(params.status, 10) || 0;
    params.publishStatus = parseInt(params.publishStatus, 10) || 0;
    const necessaryCon = {};
    const fuzzyCon = {};
    if (params.categories && params.categories !== '全部') {
      necessaryCon.categories = params.categories;
    }
    if (params.tags) {
      // vue,react
      necessaryCon.tags = {
        $all: params.tags.split(','), // [vue,react]
      };
    }
    if (params.status !== 0) {
      necessaryCon.status = params.status;
    }
    if (params.publishStatus !== 0) {
      necessaryCon.publishStatus = params.publishStatus;
    }
    if (params.title) {
      fuzzyCon.title = new RegExp(params.title, 'i');
    }
    const timeQuery = ctx.helper.getTimeQueryCon(params);
    const query = {
      $and: [
        necessaryCon,
        fuzzyCon,
        timeQuery,
      ],
    };
    // console.log('query', query);
    const countPromise = ctx.model.Articles.countDocuments(query);
    const listPromise = ctx.model.Articles
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
    const findItem = await ctx.model.Articles.findOne({
      title: params.title,
    });
    if (findItem) {
      return {
        msg: '文章已存在',
      };
    }
    const newItem = {
      ...params,
      createTime: ctx.helper.moment(),
    };
    const res = await ctx.model.Articles.create(newItem);
    if (params.publishStatus === 1) {
      await this.updateCategoriesArticleNum();
      await this.updateTagsArticleNum();
    }
    return {
      msg: '文章添加成功',
      data: res,
    };
  }

  async update(params) {
    const { ctx, app } = this;
    // console.log('params', params);
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '文章不存在',
      };
    }
    const findItem = await ctx.model.Articles.findOne({
      _id: params.id,
    });
    if (!findItem) {
      return {
        msg: '文章不存在',
      };
    }
    const updateFields = {
      ...params,
      updateTime: ctx.helper.moment(),
    };

    try {
      // $set表示只更新传入的字段，不传入的字段不做修改
      await ctx.model.Articles.updateOne(
        { _id: params.id },
        { $set: updateFields }
      );
    } catch (err) {
      // console.log(err);
      return {
        msg: '文章修改失败',
      };
    }
    if (params.status === 1 && params.publishStatus === 1) {
      await this.updateCategoriesArticleNum();
      await this.updateTagsArticleNum();
    }
    return {
      msg: '文章修改成功',
    };
  }

  async changeStatus(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '文章不存在',
      };
    }
    const findItem = await ctx.model.Articles.findOne({
      _id: params.id,
    });
    if (!findItem) {
      return {
        msg: '文章不存在',
      };
    }
    try {
      await ctx.model.Articles.updateOne(
        {
          _id: params.id,
        },
        {
          $set: {
            status: params.status,
            updateTime: ctx.helper.moment(),
          },
        }
      );
    } catch (err) {
      // console.log(err);
      return {
        msg: '文章状态修改失败',
      };
    }
    if (findItem.publishStatus === 1) {
      await this.updateCategoriesArticleNum();
      await this.updateTagsArticleNum();
    }
    return {
      msg: `文章${params.status === 1 ? '启用' : '禁用'}成功`,
    };
  }

  async changePublishStatus(params) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(params.id)) {
      return {
        msg: '文章不存在',
      };
    }
    const findItem = await ctx.model.Articles.findOne({
      _id: params.id,
    });
    if (!findItem) {
      return {
        msg: '文章不存在',
      };
    }
    try {
      await ctx.model.Articles.updateOne(
        {
          _id: params.id,
        },
        {
          $set: {
            publishStatus: params.publishStatus,
            updateTime: ctx.helper.moment(),
          },
        }
      );
    } catch (err) {
      // console.log(err);
      return {
        msg: '文章状态修改失败',
      };
    }
    if (params.publishStatus === 1) {
      await this.updateCategoriesArticleNum();
      await this.updateTagsArticleNum();
    }
    return {
      msg: `文章${params.publishStatus === 1 ? '发布' : '取消发布'}成功`,
    };
  }

  async changeCollectStatus(params) {
    const { ctx } = this;
    await ctx.model.Articles.updateMany(
      {},
      {
        isCollect: params.isCollect,
      }
    );
    return {
      msg: `文章${params.isCollect ? '一键开启' : '一键取消'}成功`,
    };
  }

  async edit(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '文章不存在',
      };
    }
    const editItem = await ctx.model.Articles.findOne({
      _id: id,
    });
    if (!editItem) {
      return {
        msg: '文章不存在',
      };
    }
    return {
      msg: '文章获取成功',
      data: editItem,
    };
  }

  async delete(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '文章不存在',
      };
    }
    const delItem = await ctx.model.Articles.findOne({
      _id: id,
    });
    if (!delItem) {
      return {
        msg: '文章不存在',
      };
    }

    try {
      await ctx.model.Articles.deleteOne({
        _id: id,
      });
    } catch (err) {
      // console.log(err);
      return {
        msg: '文章删除失败',
      };
    }
    await this.updateCategoriesArticleNum();
    await this.updateTagsArticleNum();
    return {
      msg: '文章删除成功',
    };
  }


}

module.exports = ArticlesService;
