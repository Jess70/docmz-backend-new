const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const icd10Index = new Schema({
    productCodeCategory: {type: String},
    operativeProcedure:{type:String, unique:true},
    procedureDescription:{type:String}
})

module.exports = mongoose.model("icd10Index", icd10Index)