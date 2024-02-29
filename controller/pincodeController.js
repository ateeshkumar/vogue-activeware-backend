const PincodeModel = require("../model/pinCodeModel");

exports.createPincodeController = async (req, res) => {
  try {
    const { PINCODE, CITY, STATE, DeliveryDays, CashOnDelivery } = req.body;
    const data = new PincodeModel({
      PINCODE,
      CITY,
      STATE,
      DeliveryDays,
      CashOnDelivery,
    });
    await data.save();
    res.status(200).send({
      response: true,
      message: "pincode Created successfully",
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

exports.getPincodeController = async (req, res) => {
  try {
    const id = req.query.pincode;
    const data = await PincodeModel.find({ PINCODE: id });
    res.status(200).send({
      response: true,
      message: "Date Get Successfully",
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
