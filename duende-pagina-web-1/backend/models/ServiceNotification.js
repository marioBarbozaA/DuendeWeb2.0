// serviceNotification.js
const NotificationController = require('./NotificationController');

class ServiceNotification extends NotificationController {
    update(message) {
        console.log(`Notificación de Servicio: ${message}`);
    }
}

module.exports = ServiceNotification;
