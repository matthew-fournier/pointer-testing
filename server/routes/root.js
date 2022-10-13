import Router from 'koa-router'

const router = new Router({ prefix: '/' })
const rootRouter = router

router.get('/', async (ctx) => {
  ctx.body = `
    <h1>Code Corner Demo</h1>
  `
})

export default rootRouter
