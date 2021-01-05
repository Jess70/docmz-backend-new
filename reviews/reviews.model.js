const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reviews = new Schema(
  {
    appointment: { type: Schema.Types.ObjectId, ref: "Appointments" },
    doctorid: { type: Schema.Types.ObjectId, ref: "Practise" },
    patientid: { type: Schema.Types.ObjectId, ref: "Patient" },
    rating: { type: Number, min: 0, max: 5 },
    note: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", Reviews);
