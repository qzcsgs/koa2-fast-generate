module.exports = function (tableName) {
  tableName = tableName.toLowerCase()
  upTableName = tableName.replace(/( |^)[a-z]/g,(L)=>L.toUpperCase())
  return `import koaRouter from 'koa-router'
import ${tableName}Service from '../service/${tableName}-service'
const router = koaRouter()

router.post('/list', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await ${tableName}Service.select${upTableName}(data)
})

router.post('/add', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await ${tableName}Service.insert${upTableName}(data)
})

router.post('/edit', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await ${tableName}Service.update${upTableName}(data)
})

export default router
`
}
