module.exports = function (tableName, tableKeys) {
  tableName = tableName.toLowerCase()
  upTableName = tableName.replace(/( |^)[a-z]/g,(L)=>L.toUpperCase())
  noIdTableKeys = tableKeys.filter(_ => _ != 'id')
  return `import query from '../../../utils/mysql/query'
import { formatSql } from '../../../utils/utils'

export default {
  select${upTableName} ({ page = 1, page_size = 10 }) {
    return new Promise(async (resolve) => {
      try {
        const sql = \`SELECT * FROM \\\`t_${tableName}\\\` ORDER BY id DESC LIMIT \${(page - 1) * page_size},\${page_size}\`
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