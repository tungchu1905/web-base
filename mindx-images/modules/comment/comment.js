// define SHEMA
const mongoose = require('mongoose');

const commentShema = new mongoose.Schema({
    content:{
        type: String,
        required :true,
    },
    post:{
        type: mongoose.Types.ObjectId,
        required :true,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
    }
},{
    // tu dong them truong createdAt, updatedAt
    timestamps: true
})

const CommentModel = mongoose.model('Comment', commentShema);

module.exports = CommentModel;