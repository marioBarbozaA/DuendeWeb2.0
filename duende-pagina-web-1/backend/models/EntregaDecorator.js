const mongoose = require('mongoose');


const entregaSchema = new mongoose.Schema({
    client: String,
    // Otros campos específicos de Entrega
});

module.exports = Appointment.discriminator('Entrega', entregaSchema);