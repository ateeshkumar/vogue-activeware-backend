const ProductModel = require("../model/productModel");

exports.createProductController = async (req, res) => {
  try {
    const {
      categories,
      name,
      price,
      discountPrice,
      size,
      description,
      productDetails,
    } = req.body;
    const productImg = req.files ? req.files.map((file) => file.filename) : "";
    const data = ProductModel({
      categories,
      name,
      productImg,
      price,
      discountPrice,
      size,
      description,
      productDetails,
    });
    await data.save();
    res.status(200).send({
      response: true,
      message: "Product Creted Successfull",
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

exports.getAllProduct = async (req, res) => {
  try {
    const data = await ProductModel.find({});
    res.status(200).send({
      response: true,
      message: "Product retrive",
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

exports.getSingleProduct = async (req, res) => {
  try {
    const pid = req.query.proId;
    const data = await ProductModel.findById(pid);
    res.status(200).send({
      response: true,
      message: "Product retrive",
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
