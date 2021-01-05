const express = require("express");
const otpController = require("../otp/otp.controller");
const router = express.Router();

router.post("/create", otpController.Create);
router.post("/verify", otpController.Verify);

module.exports = router;
