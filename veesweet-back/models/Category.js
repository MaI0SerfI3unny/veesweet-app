const Sequilize = require('sequelize')
const db = require('@/services/db')
const TypeCategory = require('@/models/TypeCategory')

const Category = db.define(
  'category',
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
    },
    photo: {
      type: Sequilize.STRING,
      allowNull: false,  
    }
  },
  {
    tableName: 'category',
    createdAt: false,
    updatedAt: false,
  }
)

// Associate to Category
TypeCategory.hasMany(Category)
Category.belongsTo(TypeCategory)


module.exports = Category
