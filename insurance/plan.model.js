const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plan = new Schema({
    planId:{type:Number, required:true,unique:true},
    name:{type:String}
})

module.exports = mongoose.model("plans", plan);