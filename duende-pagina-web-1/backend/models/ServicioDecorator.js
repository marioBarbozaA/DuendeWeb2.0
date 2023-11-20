const AppointmentDecorator = require('./DecoratorInterface');

class ServicioDecorator extends AppointmentDecorator {
    constructor(appointment) {
        super(appointment);
        this.serviceDetails = '';
        this.client = '';
        this.imageReference = '';
    }

    getDetails() {
        return `${super.getDetails()} - Servicio: ${this.serviceDetails} - Cliente: ${this.client} - Imagen de referencia: ${this.imageReference}`;
    }

    setServiceDetails(details) {
        this.serviceDetails = details;
    }

    setClient(client) {
        this.client = client;
    }

    setImageReference(image) {
        this.imageReference = image;
    }
}

module.exports = ServicioDecorator;
