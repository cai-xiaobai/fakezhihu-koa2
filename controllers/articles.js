const ArticleModel = require("../modules/articles");

class articleController {
  /**
   * 创建文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async createArticle(ctx) {
    //接收客服端
    let req = ctx.request.body;
    if (req.title && req.userId && req.content && req.excerpt) {
      try {
        //创建文章模型
        const ret = await ArticleModel.createArticle(req);
        //创建文章状态模型
        const data = await ArticleModel.createStatus(ret);
        ctx.response.status = 201;
        ctx.body = {
          code: 201,
          msg: '创建文章成功',
          data
        }
      } catch (err) {
        console.log(err)
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '创建文章失败',
          data: err
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '参数不齐全'
      }
    }
  }
  /**
   * 删除文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async deleteArticles(ctx) {
    //接收客服端
    let {
      articleId,
      userId
    } = ctx.request.body;
    const where = {
      id: articleId,
      creatorId: userId
    };
    try {
      //先判断文章是否存在，如果存在再进行删除操作
      const articleExist = await ArticleModel.getArticleDetail(where)
      if (articleExist) {
        //删除文章
        await ArticleModel.deleteArticles(where);
        //删除文章状态
        await ArticleModel.deleteStatus(articleId);
        ctx.body = {
          code: 202,
          msg: '删除成功'
        };
      } else {
        ctx.body = {
          code: 2001,
          msg: '文章不存在或者没权限',
        };
      };
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * 获取文章详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getArticle(ctx) {
    const {
      articleId
    } = ctx.query;
    const where = {
      id: articleId
    };
    if (articleId) {
      try {
        // 查询文章详情模型
        let data = await ArticleModel.getArticleDetail(id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '查询成功',
          data
        }
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: '查询失败',
          data
        }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: '文章ID必须填'
      }
    }
  }

  /**
   * 获取文章列表
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async getAtricleList(ctx) {
    try {
      let getAtricleList = await ArticleModel.getArticleDetail();
      ctx.response.body = {
        status: 200,
        list: this.getAtricleList,
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 修改文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async updateArticles(ctx) {

  }
}

module.exports = articleController;