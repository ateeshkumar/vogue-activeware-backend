const { default: mongoose } = require("mongoose");
const ProductModel = require("../model/productModel");
const WishlistModel = require("../model/wishListModel");
const UserModel = require("../model/userModel");

exports.addToWishlist = async (req, res) => {
  try {
    const id = req.query.uId;
    const { productId } = req.body;
    const data = await UserModel.findById(id);
    const product = await ProductModel.findById(productId);
    const session = await mongoose.startSession();
    session.startTransaction();
    data.wishlist.push(product);
    await data.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: true,
      message: "Item added",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      response: false,
      message: "Internal server error",
      error,
    });
  }
};

exports.removeToWishlist = async (req, res) => {
  try {
    const id = req.query.uId;
    const { productId } = req.body;
    const data = await UserModel.findById(id);
    const product = await ProductModel.findById(productId);
    const session = await mongoose.startSession();
    session.startTransaction();
    data.wishlist.pull(product);
    await data.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: true,
      message: "Item removed",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      response: false,
      message: "Internal server error",
      error,
    });
  }
};

exports.getWishlistItem = async (req, res) => {
  try {
    const id = req.query.uId;
    const data = await UserModel.findById(id).populate("wishlist");
    res.status(200).send({
      response: true,
      message: "Data Retrive",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: false,
      message: "Internal Server Error",
      error,
    });
  }
};
