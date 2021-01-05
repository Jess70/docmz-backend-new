const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This model is used for refferals. Referral works in two ways.
//First, a user can fill a form for someone and when they register with that mail. It will come in account of the one who filled the form.
//Second, By sending referralID

const Referral = new mongoose.Schema({
  referrerType: { type: String, enum: ["Patient", "Practise"] }, //patient or doctor, the one who sent referral
  firstName: { type: String }, //User to be register
  lastName: { type: String }, //User to be register
  phone: { type: String }, //User to be register
  email: { type: String }, //User to be register
  address: { type: String }, //User to be register
  referralId: { type: String }, //stores referral key of user who sent referral

  referredTo: { type: String, enum: ["Patient", "Practise"] },
  registered: { type: Boolean, default: false },
  registeredId: { type: Schema.Types.ObjectId, refPath: "referredTo" }
});

module.exports = mongoose.model("Referral", Referral);
