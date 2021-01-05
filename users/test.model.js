const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption")
  .fieldEncryption;
const Schema = mongoose.Schema;

const test = new Schema({
  firstName: { type: String },
  lastName: { type: String }
});

test.plugin(mongooseFieldEncryption, {
  fields: ["firstName", "lastName"],
  secret: "some secret key",
  saltGenerator: function(secret) {
    return "1234567890123456"; // should ideally use the secret to return a string of length 16
  }
});

module.exports = mongoose.model("test", test);
