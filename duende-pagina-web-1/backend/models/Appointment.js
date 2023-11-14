const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    type: String,
    details: String,
    date: Date,
    image: String,
    status: String,
    startingTime: Date,
    endingTime: Date,
    orderNumber: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
