// orderNotification.js
const NotificationController = require('./NotificationController');

class OrderNotification extends NotificationController {
    update(message) {
        console.log(`Notificación de Orden: ${message}`);
    }
}

module.exports = OrderNotification;
