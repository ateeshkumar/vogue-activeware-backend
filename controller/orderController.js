const { default: mongoose } = require("mongoose");
const OrderModel = require("../model/orderModel");
const UserModel = require("../model/userModel");

exports.createOrderController = async (req, res) => {
  try {
    const { user, paymentMode, paymentStatus, address, transactionId } =
      req.body;
    const data = new OrderModel({
      user,
      paymentMode,
      paymentStatus,
      address,
      transactionId,
    });
    const userData = await UserModel.findById(user);
    const session = await mongoose.startSession();
    session.startTransaction();
    userData?.cart?.map(async (item) => {
      data.cartItem.push(item);
    });
    userData?.cart?.map(async (item) => {
      userData.cart.pop();
    });
    await data.save({ session });
    userData.newOrder.push(data);
    await userData.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: true,
      message: "Order Created",
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

exports.getOrderList = async (req, res) => {
  try {
    const data = await OrderModel.find({})
      .sort({ date: -1 })
      .populate({ path: "cartItem", populate: "product" })
      .populate("address user");
    res.status(200).send({
      response: true,
      message: "Data Retrive",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      response: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getUserOrderList = async (req, res) => {};
