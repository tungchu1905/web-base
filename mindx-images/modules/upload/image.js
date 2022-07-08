const mongoose = require('mongoose')

const ImageShema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    cloudType:{
        type: String,
        enum: ['cloudinary']
    }
})

const ImageModel = mongoose.model('Image', ImageShema)
module.exports = ImageModel