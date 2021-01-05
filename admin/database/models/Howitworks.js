const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var howitworksSchema = new Schema({
  banner_list: {
    banner1: {
      banner_title: String,
      banner_header: String,
      banner_img: String,
      index: Number
    },
    banner2: {
      banner_title: String,
      banner_header: String,
      banner_img: String,
      index: Number
    },
    banner3: {
      banner_title: String,
      banner_header: String,
      banner_img: String,
      index: Number
    },
    banner4: {
      banner_title: String,
      banner_header: String,
      banner_img: String,
      index: Number
    }
  },
  side_list: {
    banner1: {
      banner_title: String,
      banner_header: String,
      banner_img: String,
      banner_desc: String,
      banner_button: String
    },
    banner2: {
      banner_title: String
    },
    banner3: {
      banner_title: String,
      banner_img: String,
      banner_desc: String
    }
  },
  created_at: Date,
  updated_at: Date
});

const Howitworks = mongoose.model("Howitworks", howitworksSchema);

module.exports = Howitworks;
