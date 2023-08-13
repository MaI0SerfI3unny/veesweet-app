const Sequilize = require('sequelize')
const db = require('@/services/db')

const TypeCategory = db.define(
  'type_category',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequilize.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'type_category',
    createdAt: false,
    updatedAt: false,
  }
)



module.exports = TypeCategory
