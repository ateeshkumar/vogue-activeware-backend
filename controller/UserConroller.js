const { hashPassword, comparePassword } = require("../helper/authHelper");
const CartModel = require("../model/cartModel");
const UserModel = require("../model/userModel");
const JWT = require("jsonwebtoken");
const WishlistModel = require("../model/wishListModel");
const AddressModel = require("../model/addressModel");
const { default: mongoose } = require("mongoose");
exports.userRegisterController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        response: false,
        message: "All fields Required",
      });
    }
    const hashpassword = await hashPassword(password);
    const data = new UserModel({ name, email, phone, password: hashpassword });
    const token = await JWT.sign({ _id: data._id }, process.env.SECRET_KEY, {
      expiresIn: "3000h",
    });
    await data.save();
    res.status(200).send({
      response: true,
      message: "User Register Successfully",
      data,
      token,
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

exports.loginControler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await UserModel.findOne({ email });
    if (!data) {
      res.status(404).send({
        response: false,
        message: "User not Register",
      });
    }
    const match = await comparePassword(password, data.password);
    if (!match) {
      return res.status(400).send({
        response: false,
        massage: `Password is incorrect`,
      });
    }
    const token = await JWT.sign({ _id: data._id }, process.env.SECRET_KEY, {
      expiresIn: "3000h",
    });
    res.status(200).send({
      response: true,
      message: "user register successfully",
      data,
      token,
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

exports.findAllUser = async (req, res) => {
  try {
    const data = await UserModel.find({});
    res.status(200).send({
      response: true,
      message: "User Get Successfull",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: false,
      message: "Internal Server Error",
    });
  }
};

exports.findSingleUser = async (req, res) => {
  try {
    const id = req.query.userId;
    const data = await UserModel.findById(id);
    res.status(200).send({
      response: true,
      message: "User Get Successfull",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: false,
      message: "Internal Server Error",
    });
  }
};

exports.createAddressController = async (req, res) => {
  try {
    const id = req.query.uId;
    const { pincode, houseNo, street, landmark, town, district, state } =
      req.body;
    const data = new AddressModel({
      user: id,
      pincode,
      houseNo,
      street,
      landmark,
      town,
      district,
      state,
    });
    const user = await UserModel.findById(id);
    const session = await mongoose.startSession();
    await data.save({ session });
    session.startTransaction();
    user.address.push(data);
    await user.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: true,
      message: "Address Added Successfully",
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

exports.updateAddressController = async (req, res) => {
  try {
    const id = req.query.aId;
    const { pincode, houseNo, street, landmark, town, district, state } =
      req.body;
    const data = await AddressModel.findByIdAndUpdate(id, {
      user: id,
      pincode,
      houseNo,
      street,
      landmark,
      town,
      district,
      state,
    });
    res.status(200).send({
      response: true,
      message: "Address Added Successfully",
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

exports.removeUserAddress = async (req, res) => {
  try {
    const id = req.query.uId;
    const { aid } = req.body;
    const data = await UserModel.findById(id);
    const address = await AddressModel.findById(aid);
    const session = await mongoose.startSession();
    session.commitTransaction();
    data.address.pull(address);
    await data.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: true,
      message: "Data Removed Successfully",
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

exports.getUserAddressController = async (req, res) => {
  try {
    const id = req.query.uId;
    const data = await UserModel.findById(id).populate("address");
    res.status(200).send({
      response: true,
      message: "Data Retrive Successfully",
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
