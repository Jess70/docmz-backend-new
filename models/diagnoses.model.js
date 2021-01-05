const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diagnoses = new Schema({
shortName:{type:String},
description:{type:String},
ICDCode:{type:String},
ICD10Flag:{type:String},
validFlag:{type:String},
notes:{type:String}
})

module.exports = mongoose.model("Diagnoses", diagnoses)