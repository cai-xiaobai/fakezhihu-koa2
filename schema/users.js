const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true
    },
    //登录名
    loginName: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'loginName'
    },
    //密码
    pwd: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'pwd'
    },
    //邮箱
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'email'
    },
    //用户头像地址
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'avatarUrl'
    },
    //用户简介
    headline: {
      type: DataTypes.CHAR,
      allowNull: true,
      field: 'headline'
    },
    // 创建时间
    createdAt: {
      type: DataTypes.DATE
    },
    // 更新时间
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    /**
     * 如果为true，则表示名称和model相同，即user
     * 如果为fasle，mysql创建的表名称会是复数，即users
     * 如果指定的表名称本身就是复数，则形式不变
     */
    freezeTableName: true
  });
}