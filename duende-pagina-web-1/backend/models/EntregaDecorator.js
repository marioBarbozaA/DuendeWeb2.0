const AppointmentDecorator = require('./DecoratorInterface');

class EntregaDecorator extends AppointmentDecorator {
    constructor(appointment) {
        super(appointment);
        this.deliveryDetails = '';
        this.client = '';
    }

    getDetails() {
        return `${super.getDetails()} - Entrega: ${this.deliveryDetails} - Cliente: ${this.client}`;
    }

    setDeliveryDetails(details) {
        this.deliveryDetails = details;
    }

    setClient(client) {
        this.client = client;
    }
}

module.exports = EntregaDecorator;
