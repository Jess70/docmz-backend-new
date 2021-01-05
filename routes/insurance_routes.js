const carrierController = require("../insurance/carrier.controller");
const express = require("express");
const router = express.Router();

// Add carriers to the database
router.get("/addToDatabase/carriers", carrierController.addCarriersToDatabase);

//Fetch all the carriers from the database
router.get("/get/carriers", carrierController.allCarriers)

//Delete all the carriers from the database
router.get("/delete/carriers", carrierController.deleteAll)

// exporting them
module.exports = router;