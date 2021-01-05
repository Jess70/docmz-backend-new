const express = require("express");
const router = express.Router();

const db = require("_helpers/db");
const Payment = db.Payment;

router.post("/add", async (req, res) => {
  console.log(req.body);

  try {
    let pay = new Payment(req.body);
    pay.save(function(err) {
      if (err) console.log(err);
      res.send(pay);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
