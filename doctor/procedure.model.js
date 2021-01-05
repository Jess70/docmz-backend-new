const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const procedure = new Schema({
    procedure_id:{type:Number, unique: true},
    name:{type:String},
    __typename:{type:String}
})

module.exports = mongoose.model("Procedures", procedure);