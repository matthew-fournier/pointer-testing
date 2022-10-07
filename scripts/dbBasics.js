import axios from 'axios'
import { terminal } from 'terminal-kit'
import scriptTitle from '../helpers/scriptTitle'
import connectDB from '../models'

/**
 * Get a random user
 * @returns : users' name object
 */
const getNewName = async () => {
  try {
    const { data: { results: [{ name }] } } = await axios('https://randomuser.me/api/?nat=ca')
    if (typeof name === 'undefined') {
      throw new Error('No name could be generated')
    }

    return {
      firstName: name.first,
      lastName: name.last
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

/**
 * Delete a list of ids from user table
 * @param {*} db : database object
 * @param {*} ids : array of ids to delete
 * @returns
 */
const deleteExtraUsers = async (db, ids) => {
  return await Promise.allSettled(ids.map(async (idToDestory) => {
    terminal.yellow(`\nUser with id: ${idToDestory} was deleted\n`)
    return await db.User.destroy({
      where: {
        id: idToDestory
      }
    })
  }))
}

/**
 * Find, create, and destory
 */
const dbBasics = async () => {
  try {
    scriptTitle('Database Basic')
    const db = await connectDB()
    const maxUserSize = 3

    // Create a new users and add to database
    const newName = await getNewName()
    await db.User.create(newName)
    terminal.magenta(`\n{ ${newName.firstName} ${newName.lastName} } was added to Users\n`)

    // Trim Users Down
    const allUsers = await db.User.findAll({
      order: [['id', 'DESC']]
    })
    const notFirstThreeUsers = allUsers.slice(maxUserSize, allUsers.length)
    const mappedIDS = notFirstThreeUsers.map((user) => user.id)
    await deleteExtraUsers(db, mappedIDS)

    // Get and display remaining users
    const remainingUsers = await db.User.findAll({
      order: [['id', 'ASC']]
    })
    const userList = remainingUsers
      .map((user) => `${user.dataValues.firstName} ${user.dataValues.lastName}`)
      .reverse()
      .join(', ')

    terminal.blue('\nUsers:\n')
    terminal.blue(`${userList}\n`)
  } catch (err) {
    console.error(err.message)
  }
}

export default dbBasics
