const { default: mongoose } = require("mongoose");
const OrderModel = require("../model/orderModel");
const UserModel = require("../model/userModel");

exports.createOrderController = async (req, res) => {
  try {
    const { product, user, paymentMode, paymentStatus, address } = req.body;
    const data = new OrderModel({
      product,
      user,
      paymentMode,
      paymentStatus,
      address,
    });
    const userData = await UserModel.findById(user);
    const session = await mongoose.startSession();
    session.startTransaction();
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
