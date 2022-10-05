import { Sequelize, DataTypes } from 'sequelize'

// const sequelize = new Sequelize('sqlite::memory:')

const User = async (sequelize) => {
  const model = await sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    }
  })

  return model
}

export default User
