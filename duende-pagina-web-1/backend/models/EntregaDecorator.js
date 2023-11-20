const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const entregaSchema = new mongoose.Schema({
    client: String,
    // Otros campos específicos de Entrega
});

class Entrega extends Appointment {
    constructor(data) {
        super(data);
        this.type = 'Entrega';  // Establecer el tipo del evento
    }

    setDeliveryDetails(details) {
        this.details = details;
    }

    setClient(client) {
        this.client = client;
    }
}

module.exports = mongoose.model('Entrega', entregaSchema);
