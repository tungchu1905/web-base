// define SHEMA
// tao MODEL
const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    // tu dong them truong createdAt, updatedAt
    timestamps: true
})


const UserModel = mongoose.model('User', userShema);

module.exports = UserModel;