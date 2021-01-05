const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carrier = new Schema({
    carrierId:{
        type:Number,
        required:true,
        unique: true
    },
    name:{
        type:String
    },
    plans:[{ type: Schema.Types.ObjectId, ref: "plans" }]
})

module.exports = mongoose.model("Carriers", carrier)