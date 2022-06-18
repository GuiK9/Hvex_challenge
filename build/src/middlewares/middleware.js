const crypto = require('crypto')
const axios = require('axios')
const { registerJoiSchema, loginJoiSchema } = require('../controlers/authControler.js')
const jwt = require('jsonwebtoken')
const user = require('../models/users')
const product = require('../models/product')
const Category = require('../models/category')


const register = async (req, res) => {

    const body = req.body

    const dataValidated = registerJoiSchema(body)

    if (dataValidated.error != undefined) {
        res.status(400).send(dataValidated.error.message)
    } else {

        var passHash = crypto.createHash(process.env.CODEALGDB).update(dataValidated.value.password).digest("hex")
        dataValidated.value.password = passHash

        try {

            const userModel = await user.create({ name, email, password } = dataValidated.value)

            await userModel.save()
            res.send({ message: 'user was created' })

        } catch (err) {
            res.status(500).send(err.message)
        }
    }

}

const login = async (req, res) => {

    const body = req.body
    const { error } = loginJoiSchema(body)
    if (error) {
        res.status(400).send(error.message)
    } else {

        var passHash = crypto.createHash(process.env.CODEALGDB).update(body.password).digest("hex")
        body.password = passHash

        try {
            const userModel = await user.findAll({
                where: {
                    email: body.email,
                    password: body.password
                }
            })

            const token = jwt.sign(JSON.stringify(userModel[0].dataValues), process.env.PRIVATEKEYJWT, { algorithm: process.env.CODEALGJWT })

            const tokenObj = { token }

            res.send(JSON.stringify(tokenObj))
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

}

const categoryMiddleware = async (req, res) => {

    const body = req.body

    try {
        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
        const checkedAccount = await user.findByPk(jsonJwt.id)

        if (checkedAccount === null) {
            const err = { message: "you are not registered" }
            throw err
        }

        const categories = await Category.findAll()

        try {
            res.send(categories)
        } catch (err) {
            res.status(500).send(err.message)
        }
    } catch (err) {
        res.status(500).send(err.message)
    }


}


const products = async (req, res) => {

    const body = req.body


    try {
        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
        const checkedAccount = await user.findByPk(jsonJwt.id)

        if (checkedAccount === null) {
            const err = { message: "you are not registered" }
            throw err
        }

        const categoryId = req.params.category_id

        const products = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`)

        const productsFiltred = []

        for (let i = 0; i < products.data.results.length; i++) {
            const e = products.data.results[i]

            productsFiltred.push(
                {
                    id: e.id,
                    title: e.title,
                    price: e.price,
                    available_quantity: e.available_quantity
                }
            )
        }

        try {
            res.send(productsFiltred)
        } catch (err) {
            res.status(500).send(err.message)
        }

    } catch (err) {
        res.status(500).send(err.message)
    }




}

const oneProduct = async (req, res) => {

    const body = req.body

    try {
        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
        const checkedAccount = await user.findByPk(jsonJwt.id)

        if (checkedAccount === null) {
            const err = { message: "you are not registered" }
            throw err
        }

        const idProduct = req.params.product_id

        const productDb = await product.findByPk(idProduct)

        const polishedProduct = {
            id: productDb.id,
            title: productDb.title,
            price: productDb.price,
            available_quantity: productDb.available_quantity
        }

        try {
            res.send(polishedProduct)
        } catch (err) {
            res.status(500).send(err.message)
        }

    } catch (err) {
        res.status(500).send(err.message)
    }


}

const orders = async (req, res) => {

    const body = req.body
    try {
        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
        const checkedAccount = await user.findByPk(jsonJwt.id)

        const name = checkedAccount.dataValues.name

        if (checkedAccount === null) {
            const err = { message: "you are not registered" }
            throw err
        }

        try {
            const dbProducts = await product.findAll()
            res.send({name, dbProducts})
        } catch (err) {
            res.status(500).send(err.message)
        }

    } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports = { register, login, categoryMiddleware, products, oneProduct, orders }