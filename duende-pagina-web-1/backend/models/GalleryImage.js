const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  altText: String,
});

const galleryImageSchema = new mongoose.Schema({
    name: String,
    category: String,
    subCategory: String,
    description: String,
    date: String,
    tags: [String],
    mainImage: imageSchema,  // updated to use imageSchema
    images: [imageSchema],  // updated to use imageSchema
    status: {type: Boolean, default: true} 
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
