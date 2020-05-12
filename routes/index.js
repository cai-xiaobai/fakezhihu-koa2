const Router = require('koa-router');
const ArtileController = require('../controllers/article');
const Users = require('./users');
const router = new Router({
  // prefix: '/api'
});

const addMapping = (router, mapping) => {
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
      console.log('register URL mapping: GET ${path}')
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
      console.log('register URL mapping: POST ${path}')
    } else if (url.startsWith('PUT ')) {
      const path = url.substring(4);
      router.put(path, mapping[url]);
      console.log('register URL mapping: PUT ${path}')
    } else if (url.startsWith('DELETE ')) {
      const path = url.substring(7);
      router.del(path, mapping[url]);
      console.log('register URL mapping: DELETE ${path}')
    } else {
      console.log('invalid URL: ${url}')
    }
  }
}
addMapping(router, Users)


/**
 * 文章接口
 */
//创建文章
router.post('/article/create', ArtileController.create);

//获取文章详情
router.get('/article/:id', ArtileController.detail);


module.exports = router