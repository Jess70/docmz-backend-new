const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var contactSchema = new Schema({
  contact_img: String,
  contact_text1: String,
  contact_header: String,
  contact_desc: String,
  contact_address: String,
  contact_email: String,
  contact_phone: String,
  contact_ask_header1: String,
  contact_ask_header2: String,
  contact_ask_desc: String,
  contact_ask_button1: String,
  contact_ask_button2: String,
  contact_banner_img: String,
  contact_touch_header1: String,
  contact_touch_header2: String,
  contact_touch_desc: String,
  created_at: Date,
  updated_at: Date
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
