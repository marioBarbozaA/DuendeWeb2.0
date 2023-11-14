const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: String,
    response: String,
    type: String,
    date: Date,
    galleryImageId: Number,
    status: String
});

module.exports = mongoose.model('Message', messageSchema);
