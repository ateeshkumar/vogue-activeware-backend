const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "product" },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    size: { type: String, default: "s" },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const CartItemModel = mongoose.model("cartItem", schema);

module.exports = CartItemModel;
