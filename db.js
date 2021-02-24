module.exports = function (tableName, tableKeys) {
  tableName = tableName.toLowerCase()
  upTableName = tableName.replace(/( |^)[a-z]/g,(L)=>L.toUpperCase())
  noIdTableKeys = tableKeys.filter(_ => _ != 'id')
  return `import query from '../../../utils/mysql/query'
import { formatSql } from '../../../utils/utils'

export default {
  select${upTableName} () {
    return new Promise(async (resolve) => {
      try {
        const sql = 'SELECT * FROM \`t_${tableName}\`'
        const ${tableName}s = await query({ sql })
        resolve(${tableName}s)
      } catch (error) {
        resolve(false)
      }
    })
  },
  insert${upTableName} ({ ${noIdTableKeys.join(', ')} }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ table: 't_${tableName}', data: { ${noIdTableKeys.join(', ')} } })
        await query(sqlHandle)
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  update${upTableName}ById ({ ${tableKeys.join(', ')} }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ type: 'update', table: 't_${tableName}', data: { ${noIdTableKeys.join(', ')} } })
        sqlHandle.sql += ' WHERE \`id\`=?'
        sqlHandle.params.push(id)
        await query(sqlHandle)
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  }
}
`
}