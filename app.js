const express = require("express");
const dotenv = require("dotenv");
const DB = require("./config/DB");
const userRouter = require("./route/userRoute");
const morgan = require("morgan");
const cors = require("cors");
const productRoute = require("./route/productRoute");

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

app.use("/user", userRouter);
app.use("/product", productRoute);

app.listen(process.env.PORT, () => {
  console.log("server running on port 8080");
});
