const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  password: { type: String, required: true },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usertypes",
    default: "6524d37c76e4e78632c54b13",
  },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("User", userSchema);
