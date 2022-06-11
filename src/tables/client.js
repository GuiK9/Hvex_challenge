const Sequelize = require('sequelize')
const database = require('../db')

const Client = database.define('client', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Client