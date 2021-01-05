const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timing = new Schema({
  date: { type: Date },
  time: { type: Date },
  available: { type: Boolean },
  booked: { type: Boolean, default: false },
  doctor: { type: Schema.Types.ObjectId, ref: "practise" },
  patient: { type: Schema.Types.ObjectId, ref: "patient" }
});

module.exports = mongoose.model("timings", timing);
