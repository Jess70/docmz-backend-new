const cptController = require("../codes/cpt.controller");
const express = require("express");
const router = express.Router();

// Upload CSV files to the database
router.get("/upload/cpt", cptController.parseCsvForCpt);

//Upload CPT Index to the database
router.get("/upload/cptIndex", cptController.parseCsvForCptIndex);

//Upload ICD10 Codes to the database
router.get("/upload/icd10", cptController.parseCsvForICD10)

//Upload ICD10 Index to the database
router.get("/upload/icd10index", cptController.parseCsvForICD10Index)

//Upload Diseases name to the database
router.get("/upload/diseases", cptController.parseCsvForDiseases)

//Get all the diseases 
router.get("/get/diseases",cptController.getAllDiseases)

// exporting them
module.exports = router;
