const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    cartItem: [{ type: mongoose.Types.ObjectId, ref: "cartItem" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    paymentMode: { type: String, default: "cash on Delievery" },
    paymentStatus: { type: String, default: "pending" },
    date: { type: Date, default: Date.now() },
    address: { type: mongoose.Types.ObjectId, ref: "address" },
    deleveryTime: { type: String, default: "NA" },
    orderStatus: { type: String, default: "procecing" },
    itemDelieverd: { type: String, default: "pending" },
    transactionId: { type: String, default: "" },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("order", schema);

module.exports = OrderModel;
