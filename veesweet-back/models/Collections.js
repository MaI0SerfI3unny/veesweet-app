const Sequilize = require('sequelize')
const db = require('@/services/db')
const Product = require('./Product')

const Collections = db.define(
  'collections',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequilize.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'collections',
    createdAt: false,
    updatedAt: false,
  }
)

// Associate to Product
Collections.hasMany(Product)
Product.belongsTo(Collections)

module.exports = Collections