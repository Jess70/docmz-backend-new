const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//THis model is used for holding data of family/friend of a user
const Member = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true },
  relationship: { type: String, required: true }
});

module.exports = mongoose.model("Member", Member);
