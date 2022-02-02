const mongoose = require("mongoose");

const customerModal = mongoose.Schema({
  agentName: { type: String },
  createdAt: { type: Date, require: true, default: new Date() },
  cardNumber: { type: String },
  cardExp: { type: String },
  cardCVV: { type: String },
  customerName: { type: String },
  billingAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  phoneNumber: { type: String },
  shippingAddress: { type: String },
  email: { type: String },
  productName: { type: String },
  quantity: { type: String },
  amount: { type: String },
});

const customerSchema = mongoose.model("customer", customerModal);

module.exports = customerSchema;
