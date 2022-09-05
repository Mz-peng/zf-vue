const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
// 用redis来存储session
const RedisStore = require('connect-redis')(session)
//  npm install --save redis@3.1.2
const redis = require('redis')
// 解析请求体
app.use(bodyParser.json())
// session、redis设置
// 默认已连接数据库 就把session存到redis中
const host = '106.55.103.78'
const port = 6379
const password = 'nim20220227'

app.use(
  session({
    store: new RedisStore({
      client: redis.createClient({ host, port, password }),
    }),
    saveUninitialized: true,
    resave: false,
    secret: 'mzp',
  })
)

const config = require('../nuxt.config')
const user = require('./routes/user')

app.use('/user', user)

config.dev = !(process.env.NODE_DEV === 'production')

async function start() {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}

start()

module.exports = {
  handler: app,
}
