const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const address = new Schema({
    country_code: {type:String},
    country_name: {type:String},
    address_purpose: {type:String},
    address_type: {type:String},
    address_1: {type:String},
    address_2: {type:String},
    city: {type:String},
    state: {type:String},
    postal_code: {type:String},
    telephone_number: {type:String}
})

module.exports = mongoose.model("doctorAddress", address)