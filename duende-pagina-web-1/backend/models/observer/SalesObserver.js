// saleObserver.js
const Observer = require('./Observer');

class SaleObserver extends Observer {
    update(message) {
        // Lógica específica para el observador de ventas
        console.log(`SaleObserver update: ${message}`);
        // Aquí puedes poner la lógica que necesites cuando se actualiza la venta
    }
}

module.exports = SaleObserver;
