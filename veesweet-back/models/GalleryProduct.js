const Sequilize = require('sequelize')
const db = require('@/services/db')

const GalleryProduct = db.define(
  'gallery_product',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    url: {
      type: Sequilize.TEXT,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: false,
    tableName: 'gallery_product',
    createdAt: false,
    updatedAt: false,
  }
)

module.exports = GalleryProduct
