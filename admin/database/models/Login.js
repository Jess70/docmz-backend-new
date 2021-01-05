const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var loginSchema = new Schema({
  login_banner_img: String,
  login_form_title: String,
  login_form_button: String,
  login_form_register_text: String,
  login_form_register_button: String,
  created_at: Date,
  updated_at: Date
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
