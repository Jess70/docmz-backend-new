const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insurance = new Schema({
shortName:{type:String},
name:{type: String},
description:{type: String},
addressLine1:{type: String},
addressLine2: {type: String},
city:{type: String},
state:{type: String},
zipCode:{type:String},
telephone:{type:String},
fax:{type:String},
email:{type:String},
website:{type:String},
notes:{type:String},
isActive:{type:String}
})

module.exports = mongoose.model("Insurance", insurance)