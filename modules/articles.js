// 引入mysql的配置文件
const db = require('../config/db');
// 引入sequelize对象
const Sequelize = db.sequelize;
// 引入数据表模型
const users = Sequelize.import('../schema/users');
const article = Sequelize.import('../schema/articles');
const status = Sequelize.import('../schema/status');
article.sync({
  force: false
}); //自动创建表
status.sync({
  force: false
}); //自动创建表
const _ = require('lodash');
const utils = require('../lib/utlis');
const {
  userAttributes,
  articleAttributes,
} = require('../config/default')

const articleInclude = [{
  model: users,
  attributes: userAttributes,
  as: 'author'
}, {
  model: status,
  as: 'status',
  where: {
    targetType: 0,
  },
}];

class ArticleModel {
  /**
   * 创建文章模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createArticle(data) {
    return await article.create({
      title: data.title, //标题
      excerpt: data.excerpt, //摘录
      content: data.content, //文章内容
      cover: data.imgUrl, //封面图
      creatorId: data.userId, //作者
      type: 0,
    });
  }
  /**
   * 创建文章类型模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createStatus(data) {
    return await status.create({
      voteUp: '[]',
      votedown: '[]',
      favorite: '[]',
      thanks: '[]',
      targetId: data.dataValues.id,
      targetType: 0,
    })
  }
  /**
   * 删除文章模型
   * @param where
   * @returns {Promise<*>}
   */
  static async deleteArticles(where) {
    return await article.destroy({
      where
    })
  }
  /**
   * 删除文章类型模型
   * @param data
   * @returns {Promise<*>}
   */
  static async deleteStatus(data) {
    return await status.destroy({
      where: {
        targetId: data,
        targetType: 0,
      }
    })
  }

  /**
   * 查询文章的详情
   * @param where 条件
   * @returns {Promise<Model>}
   */
  static async getArticleDetail(where) {
    return await article.findOne({
      where,
      include: articleInclude,
      attributes: articleAttributes,
    });
  }

  /**
   * 查询文章列表
   * @param data
   * @returns {Promise<Model>}
   */
  static async getArticleDetail() {
    const order = [
      ['id', 'DESC'],
    ];
    const limit,
      return await article.findAll({
        order,
        limit,
        include: articleInclude,
        attributes: articleAttributes,
      });
  }
}

module.exports = ArticleModel;