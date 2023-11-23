const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    Subject: String,
    EventType: String,
    StartTime: Date,
    EndTime: Date,
    Details: String,
    status: String,
    
    // Campos específicos para Cita
    CustomerName: String,
    ReferenceService: String,
    // Campos específicos para Entrega
    OrderNumber: String,
    DeliveryCustomerName: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = { Appointment };
