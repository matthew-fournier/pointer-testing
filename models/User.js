import { DataTypes } from 'sequelize'

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
