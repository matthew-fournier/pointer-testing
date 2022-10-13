import Koa from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import rootRouter from './routes/root'
import { terminal } from 'terminal-kit'
import userRouter from './routes/users'

const server = {}

const startServer = async () => {
  if (typeof server.app !== 'undefined') { return server }

  const app = new Koa()
  const router = new Router()

  app.use(async (ctx, next) => {
    try { await next() } catch (err) {
      terminal.red(`\nError: ${err.message}\n`)
      ctx.status = err.statusCode || err.status || 500
      ctx.body = { message: err.message || 'An Error Has Occured' }
    }
  })

  app.use(koaBody({ multipart: true }))
  app.use(router.allowedMethods())

  const routes = [
    rootRouter,
    userRouter
  ]
  routes.forEach(route => {
    app.use(route.routes())
  })

  const port = process.env.SERVER_PORT
  app.listen(port)

  const serverURL = `http://localhost:${port}/`
  terminal.green(`\nServer is running on: ${serverURL}\n`)

  server.app = app
  server.routes = routes
  server.port = port
  server.url = serverURL

  return server
}

export default startServer
