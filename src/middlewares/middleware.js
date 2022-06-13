const crypto = require('crypto')
const axios = require('axios')
const { registerJoiSchema, loginJoiSchema } = require('../controlers/authControler.js')
const jwt = require('jsonwebtoken')
const client = require('../models/client')
const product = require('../models/product')
const category = require('../models/category')
const request = require('../models/request')


const register = async (req, res) => {

    const body = req.body

    const dataValidated = registerJoiSchema(body)

    if (dataValidated.error != undefined) {
        res.status(400).send(dataValidated.error.message)
    } else {

        var passHash = crypto.createHash(process.env.CODEALGDB).update(dataValidated.value.password).digest("hex")
        dataValidated.value.password = passHash

        try {

            const clientModel = await client.create({ name, email, password } = dataValidated.value)

            await clientModel.save((err) => {
                if (err) {
                    res.send(err.message)
                }
                else {
                    res.send(clientModel)
                }
            })
        } catch (err) {
            res.send(err)
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
            const clientModel = await client.findAll({
                where: {
                    email: body.email,
                    password: body.password
                }
            })

            const token = jwt.sign(JSON.stringify(clientModel[0].dataValues), process.env.PRIVATEKEYJWT, { algorithm: process.env.CODEALGJWT })

            const tokenObj = { token }

            res.send(JSON.stringify(tokenObj))
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

}

const categoryMiddleware = async (req, res) => {
    axios.get('https://api.mercadolibre.com/sites/MLB/categories').then((resApi) => {


        const categories = resApi.data
        const categoriesFiltred = []

        categories.forEach(e => {
            if (e.id === process.env.CATEGORY1 || e.id === process.env.CATEGORY2 || e.id === process.env.CATEGORY3 || e.id === process.env.CATEGORY4) {
                categoriesFiltred.push(e)
            }
        })

        try {
            res.send(categoriesFiltred)
        } catch (err) {
            res.status(500).send(err.message)
        }

    })
}


module.exports = { register, login, categoryMiddleware }