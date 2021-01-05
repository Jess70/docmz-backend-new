const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taxonomy = new Schema({
    code:{type:String
    },
    desc:{type:String},
    primary:{type:Boolean},
    state:{type:String},
    licence:{type:String},
    taxonomy_group:{type:String}
})

module.exports = mongoose.model("Taxonomies", taxonomy)