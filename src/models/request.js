const Sequelize = require('sequelize')
const database = require('../db')
const Client = require('./client')
const Product = require('./product')

const Request = database.define('request', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
})

Request.belongsTo(Client, {
    constraint: true,
    foreignKey: "client_id",
})

Request.belongsTo(Product, {
    constraint: true,
    foreignKey: "product_id",
})

module.exports = Request