var express = require('express')
var router = express.Router()
var DB = require('../mongo')

var responseData
router.use(function(req, res, next) {
  responseData = {
    code: 0,
    message: '',
    userInfo: {}
  }
  next()
})

router.get('/', async (req, res, next) => {
  res.render('mian/layout')
})
router.post('/register', async (req, res, next) => {
  var username = req.body.username
  var password = req.body.password

  await DB.insert('users', {
    username: username,
    password: password
  }).then(data => {
    responseData.message = '注册成功'
    res.json(responseData)
    return
  })
})

router.post('/login', async (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  if (username == '' || password == '') {
    responseData.code = 1
    responseData.message = '用户名或密码不能为空'
    res.json(responseData)
    return
  } else {
    await DB.find('users', { username: username, password: password }).then(
      data => {
        console.log(data)
        if (data.length) {
          responseData.message = '登录成功'
          return
        } else {
          responseData.message = '用户名或密码错误'
        }
      }
    )
    res.json(responseData)
  }
})

module.exports = router
