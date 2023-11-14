const Singleton = require('./Singleton.js');

const addMessage = async (req, res, next) => {
    await Singleton.addMessage(req, res, next);
  };
  
  const deleteMessage = async (req, res, next) => {
    await Singleton.deleteMessage(req, res, next);
  };
  
  const getAllMessages = async (req, res, next) => {
    await Singleton.getAllMessages(req, res, next);
  };
  
  module.exports = {
    addMessage,
    deleteMessage,
    getAllMessages,
  };
