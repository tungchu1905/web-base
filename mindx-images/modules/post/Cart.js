const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    sellProducts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {
    // tu dong them created At, update At
    timestamps: true
})

const Product = new mongoose.Schema({
    title: String,

    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
}, {
    // tu dong them created At, update At
    timestamps: true
})

const CartModel = mongoose.model('Cart', PostSchema);

CartModel.findOne({
    createdBy: ''
})
    .populate({
        path: 'sellProducts',
        populate: {
            path: 'category',
            select: 'title'
        }
    })
    .populate('createdBy')
module.exports = CartModel;

/*
    {
        createdBy:{
            _id: '',
            username: '',
        },
        products:[{
            _id,
            title: '',
            category: {
                _id,
                title: '',
            }
        }]
    }
*/