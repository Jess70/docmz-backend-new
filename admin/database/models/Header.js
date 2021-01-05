const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var HeaderSchema = new Schema({
  logo_img: String,
  item_list: {
    home: {
      home_text: String,
      index: Number
    },
    join: {
      join_text: String,
      index: Number
    },
    contact: {
      contact_text: String,
      index: Number
    },
    howitworks: {
      howitworks_text: String,
      index: Number
    }
  },
  created_at: Date,
  updated_at: Date
});

const Header = mongoose.model("Header", HeaderSchema);

module.exports = Header;
