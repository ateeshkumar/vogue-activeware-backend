const multer = require("multer");
const path = require("path");
const productStorage = multer.diskStorage({
  destination: "./uploads/product",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const userStorage = multer.diskStorage({
  destination: "./uploads/user",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.productRoute = multer({ storage: productStorage });
exports.userRoute = multer({ storage: userStorage });
