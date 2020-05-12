const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
// const cors = require('koa-cors')
const index = require('./routes/index')
const koaBody = require('koa-body')

// error handler
onerror(app)

// middlewares

app.use(koaBody({
  multipart: true, //使用koaBody获取请求体内容
  strict: false, //多类型支持
  formidable: {
    //设置上传文件大小最大限制，默认2MB，修改为20MB
    maxFieldsSize: 20 * 1024 * 1024
  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// koa-cors
// app.use(cors({
//   origin: function (ctx) {
//     return ctx.header.origin
//   },
//   allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
// }));

module.exports = app