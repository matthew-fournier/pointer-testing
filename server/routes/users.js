import Router from 'koa-router'
import connectDB from '../../models'

const router = new Router({ prefix: '/users' })
const userRouter = router

router.get('/', async (ctx) => {
  const db = await connectDB()
  const users = await db.User.findAll({
    order: [['id', 'ASC']]
  })

  ctx.body = users
})

router.get('/:userID', async (ctx) => {
  const db = await connectDB()
  const { userID } = ctx.params
  const [matchedUser] = await db.User.findAll({ where: { id: userID } })

  if (typeof matchedUser === 'undefined') {
    throw new Error(`No user can be found with id: ${userID}`)
  }

  ctx.body = `
    <h1>${matchedUser.firstName} ${matchedUser.lastName}</h1>
  `
})

router.put('/:userID', async (ctx) => {
  try {
    const db = await connectDB()
    const { userID } = ctx.params
    const { firstName, lastName } = ctx.request.body

    const [changeSuccess] = await db.User.update({ firstName, lastName }, {
      where: {
        id: userID
      }
    })

    if (changeSuccess === 0) {
      throw new Error(`User with id: ${userID} could not be found`)
    }

    const [matchedUser] = await db.User.findAll({ where: { id: userID } })

    ctx.body = matchedUser
  } catch (err) {
    throw new Error(err)
  }
})

router.post('/', async (ctx) => {
  try {
    const db = await connectDB()
    const { firstName, lastName } = ctx.request.body

    const { newUser } = await db.User.create({ firstName, lastName })

    if (typeof newUser === 'undefined') {
      throw new Error('New user could not be created')
    }

    ctx.body = newUser.dataValues
  } catch (err) {
    throw new Error(err)
  }
})

router.delete('/:userID', async (ctx) => {
  try {
    const db = await connectDB()
    const { userID } = ctx.params

    const deleteRes = await db.User.destroy({ where: { id: userID } })

    if (deleteRes === 0) {
      throw new Error(`User could not be deleted with id: ${userID}`)
    }

    ctx.body = `User id: ${userID} deleted`
  } catch (err) {
    throw new Error(err)
  }
})

export default userRouter
