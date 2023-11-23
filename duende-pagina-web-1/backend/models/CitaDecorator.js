const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const servicioSchema = new mongoose.Schema({
    CustomerName: String,
    ReferenceService: String,

});

class Cita extends Appointment {
    constructor(data) {
        super(data);
        this.type = 'Cita';  // Establecer el tipo del evento
    }

    setCustomerName(CustomerName) {
        this.CustomerName = CustomerName;
    }

    setReferenceService(ReferenceService) {
        this.ReferenceService = ReferenceService;
    }

}

module.exports = Appointment.discriminator('Cita', entregaSchema);
