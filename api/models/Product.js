const mongoose = require('./init')

const Product = mongoose.model('Product', { 
    name: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    }
});

module.exports = Product