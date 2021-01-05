const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var FooterSchema = new Schema({
  logo_img: String,
  company_desc: String,
  company_address: String,
  company_email: String,
  company_number: String,
  company_copyright: String,
  app_desc: String,
  app_title: String,
  appstore_logo: String,
  playstore_logo: String,
  company_emergency_call: String,
  company_emergency_email: String,
  site_links: [
    {
      name: String,
      link: String,
      index: Number
    }
  ],
  city_text: String,
  specility_text: String,
  insurance_text: String,
  city_list: [
    {
      name_text: String,
      index: Number
    }
  ],
  insurance_list: [
    {
      insurance_text: String,
      index: Number
    }
  ],
  specility_list: [
    {
      specility_text: String,
      index: Number
    }
  ],
  created_at: Date,
  updated_at: Date
});

const Footer = mongoose.model("Footer", FooterSchema);

module.exports = Footer;
