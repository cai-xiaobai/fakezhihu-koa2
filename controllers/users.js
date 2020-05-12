const UsersModel = require("../modules/users");
const utils = require('../lib/utlis');
class usersController {
  /**
   * 创建文章
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    //接收客服端
    let req = ctx.request.body;
    if (req.loginName && req.pwd && req.email) {
      const checkout = await UsersModel.checkoutUsers(req);
      switch (checkout) {
        case 1:
          ctx.response.status = 203;
          ctx.body = {
            msg: '用户名重复，请更换用户名'
          };
          break;
        case 2:
          ctx.response.status = 203;
          ctx.body = {
            msg: '邮箱重复，请更换邮箱'
          };
          break;
        default:
          try {
            //创建文章模型
            const ret = await UsersModel.createUsers(req);
            //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
            const data = await UsersModel.getUsersDetail(ret.id);
            ctx.response.status = 200;
            ctx.body = {
              code: 200,
              msg: '创建用户成功',
              data
            }
          } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
              code: 412,
              msg: '创建用户失败',
              data: err
            }
          }
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 200,
        msg: '参数不齐全'
      }
    }
  }

  static async login(ctx) {
    let req = ctx.request.body;
    try {
      const data = await UsersModel.loginUser(req);
      // console.log(data);
      if (data === 0) {
        ctx.response.status = 206;
        ctx.body = {
          msg: '用户名或者密码不对，请修改后重新登录',
        }
      } else {
        utils.setCookies(ctx, data.dataValues);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '登录成功',
          data
        }

      }
    } catch (error) {
      utils.catchError(error);
    }
  }

  /**
   * 检查用户登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async checkLogin(ctx) {
    console.log(ctx)
    try {
      const id = ctx.cookies.get('id')
      console.log(id);
      if (ctx.cookies.get('id')) {
        ctx.response.status = 200;
        ctx.response.body = {
          name: decodeURIComponent(ctx.cookies.get('loginName')),
        };
      } else {
        ctx.response.status = 202;
      }
    } catch (error) {
      utils.catchError(ctx, error);
    }
  }

  /**
   * 用户退出登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async logout(ctx) {
    const cookies = {
      id: ctx.cookies.get('id'),
      loginName: ctx.cookies.get('loginName'),
      email: ctx.cookies.get('email'),
    }
    try {
      utils.destoryCookies(ctx, cookies);
      ctx.response.status = 200;
    } catch (error) {
      catchError(ctx, error);
    }
  }

  /**
   * 获取文章详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail(ctx) {
    let id = ctx.params.id;
    if (id) {
      try {
        // 查询文章详情模型
        let data = await UsersModel.getUsersDetail(id);
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
        msg: '用户ID必须传'
      }
    }
  }
}

module.exports = usersController;