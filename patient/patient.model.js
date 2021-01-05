const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patient = new Schema({
  accountNum: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  middleInitial: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  telephone: { type: String },
  fax: { type: String },
  email: { type: String },
  ssn: { type: String },
  chartNum: { type: String },
  notes: { type: String },
  //Id of all the appointments the patient is gonna face
  appointment: { type: Schema.Types.ObjectId, ref: "Appointments" },
  //ID of the doctors he is currently seeing or have seen before - same as zocdoc
  doctors: { type: Schema.Types.ObjectId, ref: "Practise" },
  //Fields which were given by Aziz but are not relevant as per my need
  locationId: { type: String },
  practiseId: { type: String },
  providerId: { type: String },

  isActive: { type: String }
});

module.exports = mongoose.model("Patient", patient);
