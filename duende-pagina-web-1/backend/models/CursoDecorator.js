const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const cursoSchema = new mongoose.Schema({
    participants: Number,
    // Otros campos específicos de Curso
});

class Curso extends Appointment {
    constructor(data) {
        super(data);
        this.type = 'Curso';  // Establecer el tipo del evento
    }

    setCourseDetails(details) {
        this.details = details;
    }

    setParticipantCount(participants) {
        this.participants = participants;
    }
}

module.exports = mongoose.model('Curso', cursoSchema);
