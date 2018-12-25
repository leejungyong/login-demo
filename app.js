var express = require('express')
var bodyParser = require('body-parser')

var swig = require('swig')
var app = express()

/**设置静态文件托管 */
app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }))

/**配置应用模板 */
app.engine('html', swig.renderFile)
/**设置模板文件存放的目录 */
app.set('views', './views')
/**注册所使用的模板引擎 */
app.set('view engine', 'html')

app.use('/', require('./routers/main'))

app.listen(3000)
console.log('listening on 3000')
