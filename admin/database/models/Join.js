const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var joinSchema = new Schema({
  join_form_title: String,
  join_form_button: String,
  join_form_desc: String,
  created_at: Date,
  updated_at: Date
});

const Join = mongoose.model("Join", joinSchema);

module.exports = Join;
