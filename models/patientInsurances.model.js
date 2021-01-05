const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const procedureCodes = new Schema({
//Make this as a reference id to the patient id
patientId:{type:String},
planId:{type:String},
insuranceId:{type:String},
payerId:{type:String},
relationship:{type:String},
subscriberId:{type:String},
groupNum:{type:String},
coverageType:{type:String},
startDate:{type:Date},
endDate:{type:Date},
visitCoPay:{type:String},
annualDeductable:{type:String},
coInsurance:{type:String},
firstName:{type:String},
lastName:{type:String},
middleInitial:{type:String},
SSN:{type:String},
dob:{type:String},
gender:{type:String},
addressLine1:{type:String},
addressLine2:{type:String},
city:{type:Boolean},
state:{type:String},
zipCode:{type:String},
notes:{type:String},
plasAddressId:{type:String},
isActive:{type:Boolean}
})

module.exports = mongoose.model("ProcedureCodes", procedureCodes)