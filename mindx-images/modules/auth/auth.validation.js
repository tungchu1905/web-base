const Joi = require('joi')
// dung JOI de check validate
const registerShema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
})
const loginShema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
})

module.exports ={
    registerShema,loginShema
}