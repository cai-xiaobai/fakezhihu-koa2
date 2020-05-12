const UsersController = require('../controllers/users');
// const router = require('./index');

// // //创建用户
// router.post('/users/create', UsersController.create);

// // //获取用户详情
// router.get('/users/:id', UsersController.detail);


module.exports = {
  // 'GET /users/:id': UsersController.detail,
  'POST /users/login': UsersController.login,
  'POST /users/logout': UsersController.logout,
  'POST /users/create': UsersController.create,
  'GET /users/checkLogin': UsersController.checkLogin,
}