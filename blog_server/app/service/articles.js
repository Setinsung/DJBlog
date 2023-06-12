'use strict';

const Service = require('egg').Service;

class ArticlesService extends Service {

  async updateCategoriesArticleNum() {
    const { ctx } = this;
    const pipeline = [
      {
        $lookup: {
          from: 'articles',
          let: { categoryName: '$name' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [ '$categories', '$$categoryName' ] },
                    { $eq: [ '$status', 1 ] },
                    { $eq: [ '$publishStatus', 1 ] },
                  ],
                },
              },
            },
          ],
          as: 'articles',
        },
      },
      {
        $project: {
          name: 1,
          articleNum: { $size: '$articles' },
        },
      },
    ];
    const results = await ctx.model.Categories.aggregate(pipeline).exec();
    let bulkOps = [];
    if (results && results.length > 0) {
      bulkOps = results.map(result => ({
        updateOne: {
          filter: { name: result.name },
          update: { articleNum: result.articleNum },
        },
      }));
    }
    if (bulkOps.length > 0) { await ctx.model.Categories.bulkWrite(bulkOps, { ordered: false }); }
  }

  async updateTagsArticleNum() {
    const { ctx } = this;
    // 使用聚合管道查询每个标签下符合条件的文章数量
    const pipeline = [
      {
        $lookup: {
          from: 'articles',
          let: { tagName: '$name' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: [ '$$tagName', '$tags' ] },
                    { $eq: [ '$status', 1 ] },
                    { $eq: [ '$publishStatus', 1 ] },
                  ],
                },
              },
            },
          ],
          as: 'articles',
        },
      },
      {
        $project: {
          name: 1,
          articleNum: { $size: '$articles' },
        },
      },
    ];
    const results = await ctx.model.Tags.aggregate(pipeline).exec();
    // console.log('results', results);
    let bulkOps = [];
    if (results && results.length > 0) {
      // 构造批量更新操作数组
      bulkOps = results.map(result => ({
        updateOne: {
          filter: { name: result.name },
          update: { articleNum: result.articleNum },
        },
      }));
      // 执行批量更新操作
      if (bulkOps.length > 0) { await ctx.model.Tags.bulkWrite(bulkOps, { ordered: false }); }
    }
  }

  async index(params) {
    const { ctx } = this;
    // console.log('ctx.state.user', ctx.state.user);
    // console.log('params index', params);
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;
    params.status = parseInt(params.status, 10) || 0;
    params.publishStatus = parseInt(params.publishStatus, 10) || 0;

    const necessaryCon = {
      ...(params.categories && params.categories !== '全部' && { categories: params.categories }),
      ...(params.tags && { tags: { $all: params.tags.split(',') } }),
      ...(params.status !== 0 && { status: params.status }),
      ...(params.publishStatus !== 0 && { publishStatus: params.publishStatus }),
    };

    const fuzzyCon = params.title ? { title: new RegExp(params.title, 'i') } : {};

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

  async showArticles(params) {
    const { ctx } = this;
    const page = parseInt(params.page, 10) || 1;
    const pageSize = parseInt(params.pageSize, 10) || 20;

    const necessaryCon = {
      ...(params.categories && params.categories !== '全部' && { categories: params.categories }),
      ...(params.tags && { tags: { $all: params.tags.split(',') } }),
      status: 1,
      publishStatus: 1,
    };

    const fuzzyCon = params.title ? { title: new RegExp(params.title, 'i') } : {};

    const query = {
      $and: [
        necessaryCon,
        fuzzyCon,
      ],
    };
    const countPromise = ctx.model.Articles.countDocuments(query);
    const listPromise = ctx.model.Articles
      .find(query, { status: 0, publishStatus: 0 })
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
    await this.updateCategoriesArticleNum();
    await this.updateTagsArticleNum();
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

  async showArticleDetail(id) {
    const { ctx, app } = this;
    if (!app.mongoose.Types.ObjectId.isValid(id)) {
      return {
        msg: '文章不存在',
      };
    }
    const Item = await ctx.model.Articles.findOne({
      _id: id,
      status: 1,
      publishStatus: 1,
    }, { status: 0, publishStatus: 0 });
    if (!Item) {
      return {
        msg: '文章不存在',
      };
    }
    // 查询上一篇文章和下一篇文章
    const prevItem = await ctx.model.Articles.findOne({
      _id: { $lt: id },
      status: 1,
      publishStatus: 1,
    }, { title: 1 });
    const nextItem = await ctx.model.Articles.findOne({
      _id: { $gt: id },
      status: 1,
      publishStatus: 1,
    }, { title: 1 });
    return {
      msg: '文章获取成功',
      data: Item,
      prev: prevItem,
      next: nextItem,
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
