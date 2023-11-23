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
        const adminId = "6539c5111b8018f186929836"; // Admin user ID
        const userBuyerId = message.userBuyer ? message.userBuyer.toString() : null;
        console.log('userBuyerId:', userBuyerId);
        console.log('adminId:', adminId);
        const notifications = [
            {
                user: adminId, // Admin user ID
                title: "New Sale",
                description: "A new sale has been made",
                date: new Date(),
                type: "New Order",
                state: "Active",
            },
            {
                user: userBuyerId,
                title: "Purchase Completed",
                description: "Your sale was made successfully",
                date: new Date(),
                type: "Confirm Purchase",
                state: "Active",
            }
        ];
        notifications.forEach(notification => console.log('Notification to be created:', notification));

        try {
            await SingletonDAO.createNotification(notifications);
            console.log('Both notifications created successfully');
        } catch (error) {
            console.error('Error creating notifications:', error);
        }
    }
}

class updateSaleObserver extends Observer {
    async update(message) {
        console.log(`SaleObserver update: ${message}`);
        //Admin Message
        const notificationDataAdmin = {
            user: "6539c5111b8018f186929836",
            title: "New Sale",
            description: "A new sale has been made",
            date: new Date(),
            type: "New Order",
            state: "Active",
        };
        //Cliente Message
        const notificationDataClient = {
            user: message.userBuyer,
            title: "Purchase Completed",
            description: "Your sale was made successfully",
            date: new Date(),
            type: "Confirm Purchase",
            state: "Active",
        };

        try {
            const notificationC = await SingletonDAO.createNotification(notificationDataClient);
            const notificationA = await SingletonDAO.createNotification(notificationDataAdmin);
            res.status(201).json(notificationC);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Server error' + error });
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

module.exports = { newSaleObserver, updateSaleObserver, newAppointmentObserver, updateAppointmentObserver };
