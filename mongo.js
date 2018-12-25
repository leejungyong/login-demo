var Config = {
  dbUrl: 'mongodb://localhost:27017/',
  dbName: 'koa'
}

const MongoClient = require('mongodb').MongoClient

class Db {
  static getInstance() {
    /**单例 */
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }
  constructor() {
    this.dbClient = '' /**属性，放db对象 */
    this.connect()
  }

  /**连接数据库 */
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        /**解决数据库多次连接的问题 */
        MongoClient.connect(
          Config.dbUrl,
          (err, client) => {
            if (err) {
              reject(err)
            } else {
              var db = client.db(Config.dbName)
              this.dbClient = db
              resolve(this.dbClient)
              console.log('连接成功')
            }
          }
        )
      } else {
        resolve(this.dbClient)
      }
    })
  }

  //查找数据
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        var result = db.collection(collectionName).find(json)
        result.toArray(function(err, docs) {
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }

  //插入数据
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, (err, result) => {
          if (err) {
            console.log('失败')
            reject(err)
          } else {
            resolve(result)
            console.log('成功')
          }
        })
      })
    })
  }
}

module.exports = Db.getInstance()
// var myDb = new Db()

// var myDb = Db.getInstance()
// setTimeout(() => {
//   console.time('s1')
//   myDb.find('user', {}).then(data => {
//     console.log(data)
//     console.timeEnd('s1')
//   })
// }, 100)

// setTimeout(() => {
//   console.time('s2')
//   myDb.find('user', {}).then(data => {
//     console.log(data)
//     console.timeEnd('s2')
//   })
// }, 3000)

//连接数据库
// console.time('start')
// MongoClient.connect(
//   dbUrl,
//   (err, client) => {
//     if (err) {
//       console.log(err)
//       return
//     } else {
//       var db = client.db(dbName)

//增加数据
//   db.collection('user').insertOne(
//     { username: '王五', age: 23, sex: '男', status: '1' },
//     function(err, result) {
//       if (!err) {
//         console.log('增加数据成功')
//         client.close()
//         console.timeEnd('start')
//       }
//     }
//   )

//查询数据
//       var result = db.collection('user').find({})
//       result.toArray((err, docs) => {
//         console.timeEnd('start')
//         console.log(docs)
//       })
//     }
//   }
// )
