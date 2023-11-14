const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingCartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updateDate: {type: Date, default: Date.now()},
    products: [{ 
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    status: {type: Boolean, default: true},
    total: {type: Number, default: 0}
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
