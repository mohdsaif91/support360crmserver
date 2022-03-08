const mongoose = require("mongoose");

const signUpSchema = mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
  present: { type: Boolean, default: false },
});

const signUpModal = mongoose.model("signUp", signUpSchema);

module.exports = signUpModal;
