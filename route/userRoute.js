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
  testController,
  getAddressDetails,
} = require("../controller/UserConroller");
const { requestSignIn, adminAccess } = require("../middleware/authMeddleWare");
const router = express.Router();

router.post("/signup", userRegisterController);

router.post("/forgot-password", sendEmailOtpController);

router.post("/varify-otp");

router.put("/reset-password");

router.get("/test", requestSignIn, adminAccess, testController);

router.get("/user-auth", requestSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requestSignIn, adminAccess, (req, res) => {
  res.status(200).send({ ok: true });
});

router.post("/login", loginControler);

router.get("/list", findAllUser);

router.get("/user", findSingleUser);

//address posting
router.post("/add-address", createAddressController);

router.put("/update-address", updateAddressController);

router.post("/remove-address", removeUserAddress);

router.get("/get-address", getUserAddressController);

router.get("/get-address-detail", getAddressDetails);

module.exports = router;
