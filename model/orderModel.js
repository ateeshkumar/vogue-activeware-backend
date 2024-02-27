const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    product: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    paymentMode: { type: String, default: "cash on Delievery" },
    paymentStatus: { type: String, default: "pending" },
    date: { type: Date, default: Date.now() },
    address: { type: mongoose.Types.ObjectId, ref: "address" },
    deleveryTime: { type: String, default: "NA" },
    itemDelieverd: { type: String, default: "pending" },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("order", schema);

module.exports = OrderModel;
