const UserModel = require("../model/userModel");
const JWT = require("jsonwebtoken");

exports.requestSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.adminAccess = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.isAdmin !== true) {
      return res.status(401).send({
        success: false,
        massage: "You are not authorized to access this route",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      massage: "Error in admin middleware",
      error,
    });
  }
};
