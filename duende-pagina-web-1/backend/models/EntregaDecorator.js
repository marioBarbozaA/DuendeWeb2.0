const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const entregaSchema = new mongoose.Schema({
    OrderNumber: String,
    DeliveryCustomerName: String,
    // Otros campos específicos de Entrega
});

class Entrega extends Appointment {
    constructor(data) {
        super(data);
        this.EventType = 'Entrega';  // Establecer el tipo del evento
    }

    setOrderNumber(OrderNumber) {
        this.OrderNumber = OrderNumber;
    }

    setDeliveryCustomerName(DeliveryCustomerName) {
        this.DeliveryCustomerName = DeliveryCustomerName;
    }
}

module.exports = Appointment.discriminator('Entrega', entregaSchema);
