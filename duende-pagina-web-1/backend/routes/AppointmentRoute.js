const express = require("express");
const router = express.Router();
const appointmentControllers = require("../controllers/AppointmentController.js");

router.route("/create").post(appointmentControllers.createAppointment);
router.route("/update").put(appointmentControllers.updateAppointment);
router.route("/delete").delete(appointmentControllers.deleteAppointment);
router.route("/getAll").get(appointmentControllers.getAllAppointments);

module.exports = router;
