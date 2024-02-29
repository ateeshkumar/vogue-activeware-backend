const express = require("express");
const {
  userRegisterController,
  loginControler,
  findAllUser,
  findSingleUser,
  createAddressController,
  updateAddressController,
  removeUserAddress,
  getUserAddressController,
  sendEmailOtpController,
} = require("../controller/UserConroller");
const router = express.Router();

router.post("/signup", userRegisterController);

router.post("/forgot-password", sendEmailOtpController);

router.post("/varify-otp");

router.put("/reset-password");

router.post("/login", loginControler);

router.get("/list", findAllUser);

router.get("/user", findSingleUser);

//address posting
router.post("/add-address", createAddressController);

router.put("/update-address", updateAddressController);

router.post("/remove-address", removeUserAddress);

router.get("/get-address", getUserAddressController);

module.exports = router;
