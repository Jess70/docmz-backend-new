const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clinic = new Schema(
  {
    doctor: { type: Schema.Types.ObjectId, ref: "Practise", required: true },
    ClinicType: { type: String, enum: ["owned", "visiting"], required: true },
    ClinicName: { type: String, required: true },
    City: { type: String },
    Locality: { type: String },
    StreetAdrress: { type: String },
    MapLocation: { type: String },
    ClinicNumber: { type: String, required: true },
    Fees: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("clinic", clinic);
