const fs = require('fs')
const controller = require('./controller')
const db = require('./db')
const service = require('./service')

const tableName = 'demo'
const tableKeys = ['id', 'title', 'content', 'create_time', 'update_time']
const mkdirPath = [
  `./dist/${tableName}`,
  `./dist/${tableName}/controller`,
  `./dist/${tableName}/db`,
  `./dist/${tableName}/service`
]

mkdirPath.forEach(async path => {
  await fs.mkdirSync(path)
})

const fileList = [
  {
    path: `./dist/${tableName}/controller/${tableName}-controller.js`,
    text: controller(tableName)
  },
  {
    path: `./dist/${tableName}/db/${tableName}-db.js`,
    text: db(tableName, tableKeys)
  },
  {
    path: `./dist/${tableName}/service/${tableName}-service.js`,
    text: service(tableName, tableKeys)
  }
]

fileList.forEach(async file => {
  fs.writeFile(file.path, file.text, function(err) {
    if (err) { return console.log(err) }
    console.log(file.path)
  })
})
