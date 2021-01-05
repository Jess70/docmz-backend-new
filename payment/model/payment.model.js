const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: Schema.Types.ObjectId, ref: "Practise" },
    amount: { type: String, required: true },
    transactionId: { type: String, unique: true }
  },
  { timestamps: true }
);
module.exports = mongoose.model("payment", payment);
