const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    isAdmin: { type: Boolean, default: false },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    pic: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    address: [{ type: mongoose.Types.ObjectId, ref: "address" }],
    newOrder: [{ type: mongoose.Types.ObjectId, ref: "order" }],
    orderHistory: [{ type: mongoose.Types.ObjectId, ref: "order" }],
    cart: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", schema);

module.exports = UserModel;
