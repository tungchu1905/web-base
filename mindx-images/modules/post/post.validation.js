const Joi = require('joi')
// dung JOI de check validate
const createPostShema = Joi.object({
    title: Joi.string().min(6).max(100).required(),
    description: Joi.string().min(10).max(200).required(),
    imageUrl: Joi.string().required()
})

module.exports = {createPostShema}