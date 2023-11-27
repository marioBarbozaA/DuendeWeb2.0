const { getInstance: getSingleton } = require('../../controllers/Singleton.js');
const SingletonDAO = getSingleton();

// observer.js
class Observer {
    update(message) {
        throw new Error("update method must be implemented by subclasses");
    }
}

class newSaleObserver extends Observer {
    async update(message) {
        if (!message.userBuyer) {
            console.error('userBuyer is undefined in the message object');
            return;
        }
        const adminId = '6539c5111b8018f186929836'; // Admin user ID
        const userBuyerId = message.userBuyer.toString();
        console.log('userBuyerId:', userBuyerId);
        console.log('adminId:', adminId);
        const notifications = [

            {
                user: userBuyerId,
                title: 'Purchase Completed',
                description: 'Your sale was made successfully',
                date: new Date(),
                type: 'Confirm Purchase',
                state: 'Active',
            },
            {
                user: adminId,
                title: 'New Sale',
                description: 'A new sale was made',
                date: new Date(),
                type: 'New Sale',
                state: 'Active',
            }
        ];
        notifications.forEach(notification => console.log('Notification to be created:', notification));

        try {
            const notificaciones = await SingletonDAO.createNotification(notifications);
            console.log('Both notifications created successfully');
        } catch (error) {
            console.error('Error creating notifications:', error);
        }
    }
}

class updateSaleObserver extends Observer {
    async update(message) {
        if (!message.userBuyer || !message.status) {
            console.error('userBuyer or approvalStatus is undefined in the message object');
            return;
        }

        const userBuyerId = message.userBuyer.toString();
        const approvalStatus = message.status;

        const notification = {
            user: userBuyerId,
            title: approvalStatus === 'Aceptado' ? 'Venta Aprobada' : 'Venta Rechazada',
            description: approvalStatus === 'Aceptado' ? 'Tu venta ha sido aprobada. ¡Gracias por tu compra!' : 'Lamentablemente, tu venta ha sido rechazada.',
            date: new Date(),
            type: approvalStatus === 'Aceptado' ? 'Venta Aprobada' : 'Venta Rechazada',
            state: 'Active',
        };

        console.log('Notification to be created:', notification);

        try {
            await SingletonDAO.createNotification([notification]);
            console.log('Notification created successfully');
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    }

}

class newAppointmentObserver extends Observer {
    update(message) {
        // Lógica específica para el observador de ventas
        console.log(`SaleObserver update: ${message}`);
        // Aquí puedes poner la lógica que necesites cuando se actualiza la venta
    }
}

class updateAppointmentObserver extends Observer {
    update(message) {
        // Lógica específica para el observador de ventas
        console.log(`SaleObserver update: ${message}`);
        // Aquí puedes poner la lógica que necesites cuando se actualiza la venta
    }
}

module.exports = {
    newSaleObserver,
    updateSaleObserver,
    newAppointmentObserver,
    updateAppointmentObserver
};
