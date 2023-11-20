const AppointmentDecorator = require('./DecoratorInterface');

class CursoDecorator extends AppointmentDecorator {
    constructor(appointment) {
        super(appointment);
        this.courseDetails = '';
        this.participantCount = 0;
    }

    getDetails() {
        return `${super.getDetails()} - Curso: ${this.courseDetails} - Participantes: ${this.participantCount}`;
    }

    setCourseDetails(details) {
        this.courseDetails = details;
    }

    setParticipantCount(count) {
        this.participantCount = count;
    }
}

module.exports = CursoDecorator;
