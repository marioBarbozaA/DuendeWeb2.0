const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    description: String,
    date: Date,
    type: String,
    state: String,
});

module.exports = mongoose.model('Notification', notificationSchema);
