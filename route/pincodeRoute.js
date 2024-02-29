const express = require("express");
const {
  createPincodeController,
  getPincodeController,
} = require("../controller/pincodeController");

const router = express.Router();

router.post("/create", createPincodeController);

router.get("/get-pincode", getPincodeController);
module.exports = router;
