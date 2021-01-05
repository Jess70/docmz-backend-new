const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const procedureCodes = new Schema({
//Make this as a reference id to the plan id
planId:{type:String},
shortName:{type:String},
addressLine1:{type:String},
addressLine2:{type:String},
city:{type:Boolean},
state:{type:String},
zipCode:{type:String},
isActive:{type:Boolean}
})

module.exports = mongoose.model("ProcedureCodes", procedureCodes)