const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    productStock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Product', ProductSchema)