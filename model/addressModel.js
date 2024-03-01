const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    pincode: {
      type: Number,
      required: true,
    },
    houseNo: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    landmark: {
      type: String,
      default: "",
    },
    town: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const AddressModel = mongoose.model("address", schema);

module.exports = AddressModel;
