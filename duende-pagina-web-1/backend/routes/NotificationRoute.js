const express = require('express');
const router = express.Router();
const MyNotification = require('./../controllers/NotificationController.js');


router.route('/createNotification').post(MyNotification.createNotification);
router.route('/getAllNotifications').get(MyNotification.getAllNotifications);
router.route('/getUserNotifications/:userId').get(MyNotification.getUserNotifications);

module.exports = router;
