const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var HomeSchema = new Schema({
  banner_back: String,
  banner_img: String,
  banner_text1: String,
  banner_text2: String,
  banner_text3: String,
  banner_button: String,
  appointment_text: String,
  howitworks_title_text: String,
  howitworks_header_text: String,
  howitworks_desc_text: String,
  howitworks_meta: [
    {
      image: String,
      title_text: String,
      title_header: String
    }
  ],
  specialities_text1: String,
  specialities_text2: String,
  specialities_meta: [
    {
      image: String,
      title_text: String
    }
  ],
  created_at: Date,
  updated_at: Date
});

const Home = mongoose.model("Home", HomeSchema);

module.exports = Home;
