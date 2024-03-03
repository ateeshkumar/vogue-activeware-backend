const { default: mongoose } = require("mongoose");
const CartModel = require("../model/cartModel");
const ProductModel = require("../model/productModel");
const UserModel = require("../model/userModel");
const CartItemModel = require("../model/cartItemModel");

exports.addToCart = async (req, res) => {
  try {
    const id = req.query.uId;
    const { productId } = req.body;
    const data = await UserModel.findById(id);
    const cartItem = new CartItemModel({ product: productId, user: id });
    const session = await mongoose.startSession();
    session.startTransaction();
    await cartItem.save({ session });
    data.cart.push(cartItem);
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
    const { cartItem } = req.body;
    const data = await UserModel.findById(id);
    const cartitem = await CartItemModel.findById(cartItem);
    const session = await mongoose.startSession();
    session.startTransaction();
    data.cart.pull(cartItem);
    await data.save({ session });
    await session.commitTransaction();
    const deletecartItem = await CartItemModel.findByIdAndDelete(cartItem);
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
    const data = await UserModel.findById(id).populate({
      path: "cart",
      populate: { path: "product" },
    });
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

exports.getCartItemDetails = async (req, res) => {
  try {
    const id = req.query.itemId;
    const data = await CartItemModel.findById(id).populate("user product");
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

exports.updateSizeQuantity = async (req, res) => {
  try {
    const id = req.query.itemId;
    const { size, quantity } = req.body;
    const data = await CartItemModel.findByIdAndUpdate(id, { size, quantity });
    res.status(200).send({
      response: true,
      message: "Updated",
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
