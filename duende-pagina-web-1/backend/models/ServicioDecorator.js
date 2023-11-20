const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const servicioSchema = new mongoose.Schema({
    client: String,
    image: String,
    // Otros campos específicos de Servicio
});

class Servicio extends Appointment {
    constructor(data) {
        super(data);
        this.type = 'Servicio';  // Establecer el tipo del evento
    }

    setServiceDetails(details) {
        this.details = details;
    }

    setClient(client) {
        this.client = client;
    }

    setImageReference(image) {
        this.image = image;
    }
}

module.exports = mongoose.model('Servicio', servicioSchema);
