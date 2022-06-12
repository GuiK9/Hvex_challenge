const crypto = require('crypto')
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

            const AccountModel = await client.create({ name, email, password } = dataValidated.value).then((a)=>{
                console.log(a)
            })


            await AccountModel.save((err) => {
                if (err) {
                    res.send(err.message)
                }
                else {
                    res.send(AccountModel)
                }
            })
        } catch (err) {
            res.send(err)
        }
    }

}


module.exports = { register }