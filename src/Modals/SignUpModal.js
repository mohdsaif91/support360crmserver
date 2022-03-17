const mongoose = require("mongoose");

const signUpSchema = mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
  present: { type: Boolean, default: false },
  mobileNumber: {
    type: String,
    unique: true,
    default: "1234567890",
  },
  dateOfJoining: {
    type: Date,
    default: new Date(),
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    default: "male",
  },
});

const signUpModal = mongoose.model("signUp", signUpSchema);

module.exports = signUpModal;
