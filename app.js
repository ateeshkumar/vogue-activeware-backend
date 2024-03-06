const express = require("express");
const dotenv = require("dotenv");
const DB = require("./config/DB");
const userRouter = require("./route/userRoute");
const morgan = require("morgan");
const cors = require("cors");
const productRoute = require("./route/productRoute");
const cartRoute = require("./route/cartRoute");
const wishlistRoute = require("./route/wishlistRoute");
const orderRoute = require("./route/orderRoute");
const pincodeRoute = require("./route/pincodeRoute");
const couponRoute = require("./route/couponRoute");
const reviewRoute = require("./route/reviewRoute");
const fs = require("fs");
const path = require("path");

dotenv.config();
DB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(__dirname + "./uploads"));
app.get("/", (req, res) => {
  res.status(200).send("<h1>Vogue Activewere</h1>");
});
app.use("/upload", express.static("./uploads"));
app.use("/user", userRouter);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/order", orderRoute);
app.use("/pincode", pincodeRoute);
app.use("/coupon", couponRoute);
app.use("/review", reviewRoute);

app.listen(process.env.PORT, () => {
  console.log("server running on port 8080");
});
