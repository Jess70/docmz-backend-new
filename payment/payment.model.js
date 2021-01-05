const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: Schema.Types.ObjectId, ref: "Practise" },
    transactionId: { type: String },
    amount: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("payment", payment);
