
class AppointmentDecorator {
    constructor(appointment) {
        this.appointment = appointment;
    }

    getSubject() {
        return this.appointment.Subject;
    }

    getEventType() {
        return this.appointment.EventType;
    }

    getStartTime() {
        return this.appointment.StartTime;
    }

    getEndTime() {
        return this.appointment.EndTime;
    }

    getDetails() {
        return this.appointment.Details;
    }
}

module.exports = AppointmentDecorator;
