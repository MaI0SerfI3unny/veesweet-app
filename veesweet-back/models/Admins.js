const Sequilize = require('sequelize')
const db = require('@/services/db')

const Admins = db.define(
  'admins',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name:{
        type: Sequilize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: Sequilize.STRING,
        allowNull: false,  
    }
  },
  {
    tableName: 'admins',
    createdAt: false,
    updatedAt: false,
  }
)


module.exports = Admins