const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    Subject: String,
    EventType: String,
    StartTime: Date,
    EndTime: Date,
    Details: String,
    status: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
