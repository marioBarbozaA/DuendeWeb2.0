const { getInstance: getSingleton } = require('./Singleton.js');
const SingletonDAO = getSingleton();

const createNotification = async (req, res, next) => {
    console.log('Received notification data (before):', req.body);

    const notificationData = {
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        type: req.body.type,
        state: req.body.state,
    };

    console.log('Received notification data (after):', notificationData);

    try {
        const notification = await SingletonDAO.createNotification(notificationData);
        res.status(201).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' + error });
    }
};

const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await SingletonDAO.getAllNotifications(req, res, next);
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' + error });
    }
};

const getUserNotifications = async (req, res, next) => {
    console.log('Received user ID:', req.params.userId);
    try {
        const notifications = await SingletonDAO.getUserNotifications(req, res, next);
        console.log('Notifications:', notifications);
        res.status(200).json({ notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' + error });
    }
};

// Otros métodos del controlador según tus necesidades

module.exports = {
    createNotification,
    getAllNotifications,
    getUserNotifications,
    // Agrega otros métodos según sea necesario
};