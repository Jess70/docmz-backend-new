const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const procedureCodes = new Schema({
shortName:{type:String},
description:{type:String},
code:{type:String},
amount:{type:String},
isValid:{type:Boolean},
Modifier1ID:{type:String},
Modifier2ID:{type:String},
Modifier3ID:{type:String},
Modifier4ID:{type:String},
reportDefaultModifiers:{type:Boolean},
reportCLIA:{type:Boolean},
CLIANum:{type:String},
units:{type:String},
minutes:{type:String}
})

module.exports = mongoose.model("ProcedureCodes", procedureCodes)