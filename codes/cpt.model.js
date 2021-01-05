const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cpt = new Schema({
    codeCategory: {type: String},
    cptCode:{type:String, unique:true},
    codeDescription:{type:String}
})

module.exports = mongoose.model("Cpt", cpt)