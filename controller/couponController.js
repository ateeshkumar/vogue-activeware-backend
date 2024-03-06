const cc = require("coupon-code");
const CouponModel = require("../model/couponModel");
exports.couponCodeGenerator = async (req, res) => {
  try {
    const { discount, status, couponReferName } = req.body;
    const coupon = cc.generate();
    const data = new CouponModel({
      couponCode: coupon,
      discount,
      status,
      couponReferName,
    });
    await data.save();
    res.status(200).send({
      response: true,
      message: "Coupon Code Created",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: false,
      message: "Internal Server error",
      error,
    });
  }
};

exports.applyCouponCode = async (req, res) => {
  try {
    const coupon = req.query.coupon;
    const data = await CouponModel.findOne({ couponCode: coupon });
    if (data?.status == 0) {
      return res.status(400).send({
        response: false,
        message: "Expire",
      });
    }
    res.status(200).send({
      response: true,
      message: "Applied",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: false,
      message: "Internal Server error",
      error,
    });
  }
};

exports.updateStatusCouponCode = async (req, res) => {
  try {
    const id = req.query.couponId;
    const { status } = req.body;
    const data = await CouponModel.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
    res.status(200).send({
      response: true,
      message: "Updated",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: false,
      message: "Internal Server error",
      error,
    });
  }
};
