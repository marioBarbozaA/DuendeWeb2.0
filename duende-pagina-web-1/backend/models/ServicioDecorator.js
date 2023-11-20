const mongoose = require('mongoose');


const servicioSchema = new mongoose.Schema({
    client: String,
    image: String,
    // Otros campos específicos de Servicio
});

module.exports = Appointment.discriminator('Servicio', servicioSchema);
