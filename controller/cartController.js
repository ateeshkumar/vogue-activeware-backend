const { default: mongoose } = require("mongoose");
const CartModel = require("../model/cartModel");
const ProductModel = require("../model/productModel");
const UserModel = require("../model/userModel");

exports.addToCart = async (req, res) => {
  try {
    const id = req.query.uId;
    const { productId } = req.body;
    const data = await UserModel.findById(id);
    const product = await ProductModel.findById(productId);
    const session = await mongoose.startSession();
    session.startTransaction();
    data.cart.push(product);
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

exports.removeToCart = async (req, res) => {
  try {
    const id = req.query.uId;
    const { productId } = req.body;
    const data = await UserModel.findById(id);
    const product = await ProductModel.findById(productId);
    const session = await mongoose.startSession();
    session.startTransaction();
    data.cart.pull(product);
    await data.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: true,
      message: "Item Removed",
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

exports.getCartItem = async (req, res) => {
  try {
    const id = req.query.uId;
    const data = await UserModel.findById(id).populate("cart");
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
