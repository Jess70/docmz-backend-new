const router = require("express").Router();
const medicineController = require("../medicine/medicine.controller");

router.post("/add", medicineController.addMedicine);
router.post("/addbypatient", medicineController.addMedicineByPatient);
router.get("/get/:id", medicineController.getMedicine);
router.post("/delete", medicineController.deleteMedicine);

module.exports = router;
