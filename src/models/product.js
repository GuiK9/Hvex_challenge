const Sequelize = require('sequelize')
const database = require('../db')

const Product = database.define('product', {
    id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(120),
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    available_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Product