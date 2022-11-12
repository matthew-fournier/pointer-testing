import Router from 'koa-router'

const router = new Router({ prefix: '/webhooks' })
const webhooksRouter = router

router.post('/themes-update', async (ctx) => {
  try {
    const webhookData = ctx.request.body
    console.log('THEME UPDATED')
    console.log(webhookData)
    ctx.body = JSON.stringify(webhookData)
  } catch (err) {
    throw new Error(err)
  }
})

export default webhooksRouter
