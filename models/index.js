import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
import User from './User'
dotenv.config()
const db = {}

const {
  DB_NAME,
  DB_PASSWORD,
  DB_USER_NAME,
  DB_HOST
} = process.env

const connectDB = async () => {
  try {
    if (typeof db.sequelize !== 'undefined') { return db }

    const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
      host: DB_HOST,
      dialect: 'postgres'
    })

    // await sequelize.authenticate()
    console.log(`Connected to database: ${DB_NAME}`)

    db.User = await User(sequelize)

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    })

    db.Sequelize = Sequelize
    db.sequelize = sequelize

    await sequelize.sync()

    return db
  } catch (error) {
    throw new Error(error)
  }
}

export default connectDB
