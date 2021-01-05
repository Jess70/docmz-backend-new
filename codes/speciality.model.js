const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const speciality = new Schema({
    speciality:{type:String, unique:true},
    diseases:[]
})

module.exports = mongoose.model("Speciality", speciality)