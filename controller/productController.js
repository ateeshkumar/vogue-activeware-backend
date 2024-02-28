const { query } = require("express");
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

exports.getProductCategoryList = async (req, res) => {
  try {
    const cat = req.query.catg;
    const data = await ProductModel.find({ categories: cat });
    res.status(200).send({
      response: true,
      message: "Data Retrive Success",
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

exports.deleteProductController = async (req, res) => {
  try {
    const id = req.query.pId;
    const data = await ProductModel.findByIdAndDelete(id);
    res.status(200).send({
      response: true,
      message: "Product Deleted Successfully",
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

exports.updateProductController = async (req, res) => {
  try {
    const id = req.query.pId;
    const {
      categories,
      name,
      price,
      discountPrice,
      size,
      description,
      productDetails,
    } = req.body;
    const data = await ProductModel.findByIdAndUpdate(id, {
      categories,
      name,
      price,
      discountPrice,
      size,
      description,
      productDetails,
    });
    await data.save();
    res.status(200).send({
      response: true,
      message: "Data Update Successfully",
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
