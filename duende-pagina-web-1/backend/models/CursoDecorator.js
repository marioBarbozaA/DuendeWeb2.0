const mongoose = require('mongoose');


const cursoSchema = new mongoose.Schema({
    participants: Number,
    // Otros campos específicos de Curso
});

module.exports = Appointment.discriminator('Curso', cursoSchema);
