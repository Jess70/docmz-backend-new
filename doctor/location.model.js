const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const location = new Schema({
practiseId:{ type: Schema.Types.ObjectId, ref: "Practise" },
shortName:{type:String},
organizationName:{type: String},
description:{type:String},
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
taxId:{type: String},
posId:{type: String},
notes:{type:String},
isActive:{type:String}
})

module.exports = mongoose.model("Location", location)