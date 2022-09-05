const express = require('express')
const User = require('../db/user')

const router = express.Router()

router.post('/login', async (request, response) => {
  // 获取用户名和密码
  const { username, password } = request.body
  const result = await User.findOne({ username, password })
  if (result) {
    request.session.user = result
    response.json({
      code: 0,
      data: '登录成功',
    })
  } else {
    response.json({
      code: 1,
      data: '用户名或密码不正确',
    })
  }
})

router.post('/reg', async (request, response) => {
  // 获取用户名和密码
  const { username, password } = request.body
  const result = await User.findOne({ username })
  if (result) {
    response.json({
      code: 1,
      data: '用户已被注册',
    })
  } else {
    await User.create({ username, password })
    response.json({
      code: 0,
      data: '注册成功',
    })
  }
})

module.exports = router
