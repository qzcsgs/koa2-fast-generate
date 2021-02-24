module.exports = function (tableName, tableKeys) {
  tableName = tableName.toLowerCase()
  upTableName = tableName.replace(/( |^)[a-z]/g,(L)=>L.toUpperCase())
  noIdTableKeys = tableKeys.filter(_ => _ != 'id')
  return `import ${tableName}Db from '../db/${tableName}-db'
import { success, error } from '../../../utils/response'

export default {
  async select${upTableName} ({ page, page_size }) {
    const ${tableName}s = await ${tableName}Db.select${upTableName}({ page, page_size })
    return ${tableName}s ? success(${tableName}s) : error()
  },
  async insert${upTableName} ({ ${noIdTableKeys.join(', ')} }) {
    const result = await ${tableName}Db.insert${upTableName}({ ${noIdTableKeys.join(', ')} })
    return result ? success() : error()
  },
  async update${upTableName} ({ ${tableName}_id, ${noIdTableKeys.join(', ')} }) {
    const result = await ${tableName}Db.update${upTableName}ById({ id: ${tableName}_id, ${noIdTableKeys.join(', ')} })
    return result ? success() : error()
  }
}
`
}