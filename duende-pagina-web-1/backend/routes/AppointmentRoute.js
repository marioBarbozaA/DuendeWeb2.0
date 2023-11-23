const express = require('express');
const router = express.Router();
const Appointment = require('./../controllers/AppointmentController.js');

router.route('/create').post(authRequire, appointmentControllers.createAppointment);
router.route('/update').put(authRequire, appointmentControllers.updateAppointment);
router.route('/delete').delete(authRequire, appointmentControllers.deleteAppointment);
router.route('/getAll').get(authRequire, appointmentControllers.getAllAppointments);

module.exports = router;