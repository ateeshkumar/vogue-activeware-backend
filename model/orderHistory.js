const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    order: { type: mongoose.Types.ObjectId, ref: "order" },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const OrderHistryModel = mongoose.model("orderHistry", schema);

module.exports = OrderHistryModel;
