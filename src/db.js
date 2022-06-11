require('dotenv').config()
const Sequelize = require('sequelize')

const proEnv = process.env

const sequelize = new Sequelize(proEnv.DB_NAME, proEnv.DB_USER, proEnv.USER_PASSWORD, {
    dialect: proEnv.DIALECT,
    host: proEnv.HOST,
    port: proEnv.PORT
})

module.exports = sequelize

