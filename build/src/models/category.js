const Sequelize = require('sequelize')
const database = require('../db')

const Category = database.define("category", {
    id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(70),
        allowNull: false
    }
})

module.exports = Category