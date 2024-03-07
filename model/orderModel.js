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
    price: { type: Number, default: "" },
    orderStatus: { type: String, default: "procecing" },
    itemDelieverd: { type: String, default: "pending" },
    transactionId: { type: String, default: "" },
    deliveredTime: { type: Date, default: null },
    review: { type: String, default: "" },
    resion: { type: String, default: "" },
    discount: { type: String, default: "" },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("order", schema);

module.exports = OrderModel;
