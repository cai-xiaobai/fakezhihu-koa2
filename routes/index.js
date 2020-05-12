const Router = require('koa-router');

const Users = require('./users');
const Upload = require('./upload');
const Articles = require('./articles');

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
addMapping(router, Upload)
addMapping(router, Articles)


module.exports = router