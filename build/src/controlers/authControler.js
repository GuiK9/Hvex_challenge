const joi = require('joi')

const registerJoiSchema = (data) => {

    const schema = joi.object({
        name: joi.string().required().min(6).max(50),
        email: joi.string().required().min(6).max(50),
        password: joi.string().required().min(6).max(26)
    })
    return schema.validate(data)
}

const loginJoiSchema = (data) => {

    const schema = joi.object({
        email: joi.string().min(6).max(50).required(),
        password: joi.string().required()
    })

    return schema.validate(data)
}

module.exports = { registerJoiSchema, loginJoiSchema }
