const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const citaSchema = new mongoose.Schema({
    CustomerName: String,
    ReferenceService: String,

});

class Cita extends Appointment {
    constructor(data) {
        super(data);
        this.EventType = 'Cita';  // Establecer el tipo del evento
    }

    setCustomerName(CustomerName) {
        this.CustomerName = CustomerName;
    }

    setReferenceService(ReferenceService) {
        this.ReferenceService = ReferenceService;
    }

}

module.exports = Appointment.discriminator('Cita', citaSchema);
