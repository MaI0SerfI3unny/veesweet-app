const Sequilize = require('sequelize')
const db = require('@/services/db')

const Banner = db.define(
  'banners', 
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
      type: Sequilize.STRING,
      allowNull: false,
    },
    bottom_description: {
      type: Sequilize.STRING,
      allowNull: false,
    },
    link: {
      type: Sequilize.TEXT,
      allowNull: false,
    },
    discount: {
      type: Sequilize.INTEGER,
       allowNull: false,
    },
    photo: {
      type: Sequilize.STRING,
      allowNull: false,
    }
  }
)

module.exports = Banner
