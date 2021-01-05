const router = require("express").Router();
const controller = require("../referral/referral.controller");

router.post("/add", controller.add);

module.exports = router;
