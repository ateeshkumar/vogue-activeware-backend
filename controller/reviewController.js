const { default: mongoose } = require("mongoose");
const ProductModel = require("../model/productModel");
const ReviewsModel = require("../model/reviewsModel");

exports.createReview = async (req, res) => {
  try {
    const { rating, userId, deacription, productId } = req.body;
    const productImg = req.file ? req.file.filename : "";
    const data = new ReviewsModel({
      userId,
      productImg,
      deacription,
      productId,
    });
    const product = await ProductModel.findById(productId);
    const prevRating = parseInt(product.rating);
    const addtion = (parseInt(rating) + prevRating) / 2;
    await ProductModel.findByIdAndUpdate(productId, {
      $set: { rating: addtion },
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await data.save({ session });
    product.reviews.push(data);

    await product.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: true,
      message: "Reviews Sent",
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
