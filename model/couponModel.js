const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    couponCode: {
      type: String,
      default: "",
    },
    discount: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 1,
    },
    couponReferName: {
      type: String,
      default: "",
    },
    order: [{ type: mongoose.Types.ObjectId, ref: "order" }],
  },
  { timestamps: true }
);
const CouponModel = mongoose.model("coupon", schema);
module.exports = CouponModel;
