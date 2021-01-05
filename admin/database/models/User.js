const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
var userSchema = new Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  meta: {
    number: Number,
    first_name: String,
    last_name: String
  },
  created_at: Date,
  updated_at: Date
});

userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
