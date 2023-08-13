const Sequilize = require('sequelize')
const db = require('@/services/db')
const Product = require('@/models/Product')

const Order = db.define(
  'order',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: Sequilize.STRING,
      allowNull: false,
    },
    middle_name: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    payment:{
        type: Sequilize.STRING,
        allowNull: false,
    },
    deliveryType :{
        type: Sequilize.STRING,
        allowNull: false,
    },
    address:{
        type: Sequilize.STRING,
        allowNull: false,
    },
  },
  {
    tableName: 'order',
    createdAt: false,
    updatedAt: false,
  }
)

// Associate to Tags
Order.belongsToMany(Product, {
    through: 'orders_products',
  })
Product.belongsToMany(Order, {
    through: 'orders_products',
})

module.exports = Order
