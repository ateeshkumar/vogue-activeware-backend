const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  categories: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  productImg: [{ type: String }],
  price: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  size: [{ type: String }],
  description: {
    type: String,
    default: "",
  },
  productDetails: {
    type: String,
    default: "",
  },
  rating: {
    type: String,
    default: "5",
  },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "reviews" }],
});
const ProductModel = mongoose.model("product", schema);

module.exports = ProductModel;
