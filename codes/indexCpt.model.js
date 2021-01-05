const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indexCpt = new Schema({
    productCode: {type: String},
    operativeProcedure:{type:String},
    procedureDescription:{type:String}
})

module.exports = mongoose.model("indexCpt", indexCpt)