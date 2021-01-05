const questionnaireController = require("../questionnaire/questionnaire.controller");
const express = require("express");
const router = express.Router();

// Add a question
router.post("/add", questionnaireController.addQuestion);

//Get all question
router.post("/get", questionnaireController.getQuestion);

router.post("/update", questionnaireController.updateQuestion);

router.post("/delete", questionnaireController.deleteQuestion);

router.post("/delete/root", questionnaireController.deleteRoot);

// exporting them
module.exports = router;
