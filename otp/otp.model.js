const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Otp = new Schema({
  email: {
    type: String
  },
  otp: { type: Number },
  verify: {
    type: Boolean,
    default: false
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" }
  }
});

module.exports = mongoose.model("otp", Otp);
