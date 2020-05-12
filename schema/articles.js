const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  const Article = sequelize.define('articles', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    //文章标题
    title: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'title'
    },
    //内容
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content'
    },
    //摘录
    excerpt: {
      type: DataTypes.CHAR
    },
    //作者Id
    creatorId: {
      type: DataTypes.INTEGER
    },
    //类型
    type: {
      type: DataTypes.INTEGER
    },
    //封面
    cover: {
      type: DataTypes.CHAR
    },
    // 创建时间
    createdAt: {
      type: DataTypes.DATE
    },
    // 更新时间
    updatedAt: {
      type: DataTypes.DATE
    }
  });
  Article.associate = (module) => {
    //关联 articles 表与 users 表，方便联表查询
    Article.belongsTo(modules.users, {
      foreignKey: 'creatorId',
      as: 'author'
    });
    //关联 articles 表与 status 表，方便联表查询
    Article.hasOne(module.status, {
      foreignKey: 'targetId',
      as: 'status'
    });
    //如果id字段在当前表上，就使用hasOne;反之，不在，则使用belongsTo字段。
    //foreignKey是互相关联的字段名； as是一个别名，代表着联表查询结果的字段名。
  }
  return Article;
}