const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  const Status = sequelize.define('status', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    //支持
    voteUp: {
      type: DataTypes.TEXT,
    },
    //感谢
    thanks: {
      type: DataTypes.TEXT,
    },
    //反对
    voteDown: {
      type: DataTypes.TEXT,
    },
    //喜爱
    favorite: {
      type: DataTypes.TEXT,
    },
    //文章Id
    targetId: {
      type: DataTypes.INTEGER,
    },
    //文章类型
    targetType: {
      type: DataTypes.INTEGER,
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
  return Status;
}