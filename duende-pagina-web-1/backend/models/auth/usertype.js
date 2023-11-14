// usertype.js
const mongoose = require('mongoose');

const usertypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Otros campos específicos de usertype
});

const Usertype = mongoose.model('Usertype', usertypeSchema, 'usertypes');

module.exports = Usertype;
