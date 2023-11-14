const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: String,
    altText: String,
    });

const locationSchema = new mongoose.Schema({
    provincia: String,
    canton: String,
    distrito: String,
    details: String,
    });

const saleSchema = new mongoose.Schema({
    orderNum : String,
    userBuyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      products: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    date : { type: Date, default: Date.now },
    deliverDate: Date,
    location : locationSchema,
    sinpe: imageSchema,
    tax: {type: Number, default: 0.13},
    deliveryCost: {type: Number, default: 8},
    total: Number,
    status: {type: String, default: "Pendiente"},
    actualBuyerName: String,
    actualBuyerPhone: String,
    actualBuyerEmail: String,
    });

module.exports = mongoose.model('Sale', saleSchema,'sale');
