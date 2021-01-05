const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const icd10 = new Schema({
    productCodeCategory: {type: String},
    pcsCode:{type:String, unique:true},
    procedureDescription:{type:String}
})

module.exports = mongoose.model("icd10", icd10)