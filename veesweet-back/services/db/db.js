const Sequilize = require('sequelize')

const db = new Sequilize(
  process.env.DATABASE_NAME,
  process.env.LOGIN_MYSQL,
  process.env.PASSWORD_MYSQL,
  {
    dialect: 'mysql',
    port: process.env.PORT_MYSQL,
    host: process.env.HOST_MYSQL,
  }
)

module.exports = db