const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  PINCODE: { type: Number, default: 0 },
  CITY: { type: String, default: "" },
  STATE: { type: String, default: "" },
  DeliveryDays: { type: Number, default: 0 },
  CashOnDelivery: { type: String, default: "" },
});

const PincodeModel = mongoose.model("pincode", schema);

module.exports = PincodeModel;
