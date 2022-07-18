// define SHEMA
const mongoose = require('mongoose');

const postShema = new mongoose.Schema({
    title:{
        type: String,
        required :true,
    },
    description: {
        type: String,
    },
    likeCount:{
        type:Number,
    },
    tags:[String],
    imageUrl:{
        type: String,
    },
    // comments: [commentShema],
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
},{
    // tu dong them truong createdAt, updatedAt
    timestamps: true
})

const PostModel = mongoose.model('Post', postShema);

module.exports = PostModel;