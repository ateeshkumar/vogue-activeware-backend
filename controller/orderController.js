const { default: mongoose } = require("mongoose");
const OrderModel = require("../model/orderModel");
const UserModel = require("../model/userModel");
const PincodeModel = require("../model/pinCodeModel");

exports.createOrderController = async (req, res) => {
  try {
    const { user, price, paymentMode, paymentStatus, address, transactionId } =
      req.body;
    const data = new OrderModel({
      user,
      price,
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

exports.getUserNewOrderList = async (req, res) => {
  try {
    const id = req.query.userId;
    const data = await UserModel.findById(id)
      .populate({
        path: "newOrder",
        populate: { path: "cartItem", populate: { path: "product" } },
      })
      .populate({ path: "newOrder", populate: { path: "address" } })
      .select("_id newOrder");
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

exports.orderProcesingUpdate = async (req, res) => {
  try {
    const id = req.query.orderId;
    const orderDetails = await OrderModel.findById(id).populate("address");
    const pincode = orderDetails.address.pincode;
    const pincodeData = await PincodeModel.find({ PINCODE: pincode });
    const data = await OrderModel.findByIdAndUpdate(id, {
      $set: {
        deleveryTime: `${pincodeData[0].DeliveryDays} Days`,
        orderStatus: `${pincodeData[0].DeliveryDays} Days`,
      },
    });
    res.status(200).send({
      response: true,
      message: "Order Process",
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

exports.orderProcessStatus = async (req, res) => {
  try {
    const id = req.query.orderId;
    const { orderStatus } = req.body;
    const data = await OrderModel.findByIdAndUpdate(id, {
      $set: { orderStatus: orderStatus },
    });
    await data.save();
    res.status(200).send({
      response: true,
      message: "Order Status Updated",
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

exports.orderItemDeliverd = async (req, res) => {
  try {
    const id = req.query.orderId;
    const data = await OrderModel.findByIdAndUpdate(id, {
      $set: {
        itemDelieverd: "delivered",
        deliveredTime: Date.now(),
        orderStatus: "delivered",
        paymentStatus: "paid",
      },
    });
    await data.save();
    res.status(200).send({
      response: true,
      message: "Order Delivered",
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

exports.cancelOrderd = async (req, res) => {
  try {
    const id = req.query.orderId;
    const data = await OrderModel.findByIdAndUpdate(id, {
      $set: {
        orderStatus: "cancelled",
        itemDelieverd: "cancelled",
      },
    });
    res.status(200).send({
      response: true,
      message: "Order Cancelled",
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

exports.itemDeliverdByToday = async (req, res) => {
  try {
    var today = new Date();
    const data = await OrderModel.find({
      deliveredTime: { $lte: today },
    });
    res.status(200).send({
      response: true,
      message: "Retrive Successfully",
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

exports.itemOrderedByToday = async (req, res) => {
  try {
    var today = new Date();
    const data = await OrderModel.find({
      date: { $lte: today },
    });
    res.status(200).send({
      response: true,
      message: "Retrive Successfully",
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

exports.procesingOrderedList = async (req, res) => {
  try {
    const data = await OrderModel.find({
      orderStatus: "procecing",
    });
    res.status(200).send({
      response: true,
      message: "Retrive Successfully",
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

exports.allItemDeliverd = async (req, res) => {
  try {
    const data = await OrderModel.find({
      itemDelieverd: "delivered",
    });
    res.status(200).send({
      response: true,
      message: "Retrive Successfully",
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
