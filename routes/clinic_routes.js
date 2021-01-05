const express = require("express");
const router = express.Router();
const clinicController = require("../clinic/clinic.controller");

router.post("/add", clinicController.addClinic);
router.post("/edit", clinicController.editClinic);
router.get("/getallclinic", clinicController.getAllClinic);
router.get("/getclinic/:id", clinicController.getClinic);
router.get("/bydoctor/:doctor", clinicController.getClinicByDoc);

module.exports = router;
