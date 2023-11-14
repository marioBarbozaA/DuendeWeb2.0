const { getInstance: getSingleton } = require('./Singleton.js');
const Singleton = getSingleton();

const createAppointment = async (req, res, next) => {
    await Singleton.createAppointment(req, res, next);
  };
  
  const updateAppointment = async (req, res, next) => {
    await Singleton.updateAppointment(req, res, next);
  };
  
  const deleteAppointment = async (req, res, next) => {
    await Singleton.deleteAppointment(req, res, next);
  };
  
  const getAppointmentById = async (req, res, next) => {
    await Singleton.getAppointmentById(req, res, next);
  };
  
  const getAllAppointments = async (req, res, next) => {
    await Singleton.getAllAppointments(req, res, next);
  };
  
  module.exports = {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    getAllAppointments,
  };