const { hashPassword, comparePassword } = require("../helper/authHelper");
const UserModel = require("../model/userModel");
const JWT = require("jsonwebtoken");
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
