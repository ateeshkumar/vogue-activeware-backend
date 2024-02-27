const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    product: [
      {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    ],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const WishlistModel = mongoose.model("wishlist", schema);

module.exports = WishlistModel;
