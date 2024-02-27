const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  productImg: [{ type: String }],
  deacription: { type: String, default: "" },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "product",
  },
});
const ReviewsModel = mongoose.model("reviews", schema);

module.exports = ReviewsModel;
