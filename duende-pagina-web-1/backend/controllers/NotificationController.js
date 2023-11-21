const { getInstance: getSingleton } = require('./Singleton.js');
const SingletonDAO = getSingleton();
const Notification = require('../models/Notification.js');

// Controller to get all notifications
const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await SingletonDAO.getAllNotifications(req, res, next);
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

// Controller to create a notification
const createNotification = async (req, res, next) => {
    const notificationData = {
        user: req.body.user,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        type: req.body.type,
        state: req.body.state,
    };

    try {
        const notification = await SingletonDAO.createNotification(notificationData);
        res.status(201).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

// Controller to update a notification
const updateNotification = async (req, res, next) => {
    const notificationData = req.body;
    try {
        const notification = await SingletonDAO.updateNotification(req, res, next);
        res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

// Controller to delete a notification
const deleteNotification = async (req, res, next) => {
    try {
        const notification = await SingletonDAO.deleteNotification(req, res, next);
        res.status(204).json(); // No content for successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

// Controller to get a notification by ID
const getNotificationById = async (req, res, next) => {
    try {
        const notification = await SingletonDAO.getNotificationById(req, res, next);
        res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

module.exports = {
    getAllNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
    getNotificationById,
};
