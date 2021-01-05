const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payer = new Schema({
shortNum:{type:String},
payerName:{type:String},
description:{type:String},
//What is this??
payerId:{type:String},


addressLine1:{type: String},
addressLine2: {type: String},
city:{type: String},
state:{type: String},
zipCode:{type:String},
telephone:{type:String},
fax:{type:String},
email:{type:String},
website:{type:String},
payerType:{type:String},
url:{type:String},
primaryBillingMethod:{type:String},
secondaryBillingMethod:{type:String},
insuranceId:{type:String},
capitatedPlan:{type:Boolean},
payerSubmissionProfileId:{type:String},
notes:{type:String},
isActive:{type:String}
})

module.exports = mongoose.model("Payer", payer)