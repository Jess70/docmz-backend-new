const express = require("express");
const router = express.Router();
const team = require("../teams/teams.controller");

router.use("/add", team.add);

router.use("/update", team.update);

module.exports = router;
