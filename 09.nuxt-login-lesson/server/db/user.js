const mongoose = require('mongoose')
const url = 'mongodb://106.55.103.78:27017/zhufeng'
const conn = mongoose.createConnection(url)

conn.on('connected', function (err) {
  if (err) {
    console.log('连接数据库失败：' + err)
  } else {
    console.log('连接数据库成功！')
  }
})

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
})

module.exports = conn.model('User', UserSchema)
