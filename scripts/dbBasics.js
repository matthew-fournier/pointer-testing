import scriptTitle from '../helpers/scriptTitle'
import connectDB from '../models'

const dbBasics = async () => {
  try {
    scriptTitle('Database Basic')
    const db = await connectDB()

    console.log(db.User, '***')
    const users = await db.User.findAll()
    console.log(users)

    // await db.User.create({ firstName: 'Jane', lastName: 'Doe' })
    // console.log(users)
  } catch (err) {
    throw new Error(err)
  }
}

export default dbBasics
