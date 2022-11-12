import Router from 'koa-router'
import glob from 'glob-promise'
import * as fs from 'fs'

const router = new Router({ prefix: '/pages' })
const pagesRouter = router

const pages = fs.readdirSync('web/pages')

pages.forEach(async (page) => {
  const pageName = page.split('.')[0]

  const documentBody = fs.readFileSync(`web/pages/${page}`, 'utf8')

  const document = fs.readFileSync('web/layout/document.html', 'utf8')
    .replace('[[title]]', pageName.toUpperCase())
    .replace('[[body]]', documentBody)

  // const componentList = await glob('web/components/**/**.html')
  // console.log(g)

  router.get(`/${pageName === 'home' ? '' : pageName}`, async (ctx) => {
    ctx.response.set('content-type', 'txt/html')
    ctx.type = 'html'
    ctx.body = document
  })
})

export default pagesRouter
