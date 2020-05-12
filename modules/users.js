// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Users = Sequelize.import('../schema/users');
Users.sync({
  force: false
}); //自动创建表

class UsersModel {
  /**
   * 创建用户模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createUsers(data) {
    return await Users.create({
      loginName: data.loginName, //登录名
      pwd: data.pwd, //密码
      email: data.email, //email
      avatarUrl: '',
      headline: ''
    });
  }

  static async checkoutUsers(data) {
    const infoList = await Users.findAll({
      attributes: ['loginName', 'email'],
    });
    //获取所有用户名
    const nameList = infoList.map(item => item.dataValues.loginName);
    if (nameList.includes(data.loginName)) {
      return 1;
    }
    //获取所有邮箱
    const emailList = infoList.map(item => item.dataValues.email);
    if (emailList.includes(data.email)) {
      return 2;
    }
    return 0;
  }

  /**
   * 用户的详情
   * @param data
   * @returns {Promise<Model>}
   */
  static async loginUser(data) {
    const {
      loginName,
      pwd
    } = data;
    const where = {
      loginName,
      pwd
    };
    const attributes = ['loginName', 'id', 'email'];
    return await Users.findOne({
      where,
      attributes
    }).then((res) => {
      if (res === null) {
        return 0;
      } else {
        return res;
      }
    })
  }


  /**
   * 查询用户的详情
   * @param id 用户ID
   * @returns {Promise<Model>}
   */
  static async getUsersDetail(id) {
    return await Users.findOne({
      where: {
        id
      }
    });
  }
}

module.exports = UsersModel;