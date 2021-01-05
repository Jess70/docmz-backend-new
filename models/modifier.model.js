const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modifierCodes = new Schema({
shortName:{type:String},
description:{type:String},
modifierCode:{type:String},
validFlag:{type:Boolean},
notes:{type:String}

})

module.exports = mongoose.model("ModifierCodes", modifierCodes)     