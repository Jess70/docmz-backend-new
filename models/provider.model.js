const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provider = new Schema({
shortName:{type: String},
firstName:{type: String},
lastName:{type: String},
addressLine1:{type: String},
addressLine2: {type: String},
city:{type: String},
state:{type: String},
zipCode:{type:String},
telephone:{type:String},
fax:{type:String},
email:{type:String},
website:{type:String},
npi:{type:String},
taxonomyCode:{type:String},
ssn:{type: String},
isActive:{type:String}
})

module.exports = mongoose.model("Provider", provider)