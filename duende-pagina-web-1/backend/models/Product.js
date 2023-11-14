const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  altText: String,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  stock: Number,
  mainImage: imageSchema,
  secondaryImages: [imageSchema],
  status: { type: String, default: 'active' }, 
  category: String,
});

module.exports = mongoose.model('Product', productSchema,'product');
