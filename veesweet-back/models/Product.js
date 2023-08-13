const Sequilize = require('sequelize')
const db = require('@/services/db')
const Category = require('@/models/Category')
const GalleryProduct = require('./GalleryProduct')

const Product = db.define(
  'product',
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
    description: {
        type: Sequilize.TEXT,
        allowNull: false,
    },
    discount: {
        type: Sequilize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    price: {
        type: Sequilize.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    param:{
      type: Sequilize.JSON,
      allowNull: false,
      defaultValue: []
    },
    vendorCode:{
      type: Sequilize.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'product',
    createdAt: false,
    updatedAt: false,
  }
)

// Associate to Category
Category.hasMany(Product)
Product.belongsTo(Category)

// Associate to Gallery
Product.hasMany(GalleryProduct)
GalleryProduct.belongsTo(Product)

module.exports = Product
