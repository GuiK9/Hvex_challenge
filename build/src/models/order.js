const Sequelize = require('sequelize')
const database = require('../db')
const Client = require('./users')
const Product = require('./product')

const Order = database.define('order', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
})

Order.belongsTo(Client, {
    constraint: true,
    foreignKey: "client_id",
})

Order.belongsTo(Product, {
    constraint: true,
    foreignKey: "product_id",
})

module.exports = Order