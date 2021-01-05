const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//This model is not in use. But if we want to have more than one questionnaire for a doctor. We can make of this model
const questionnaire = new Schema(
  {
    title: { type: String },
    question: [{ type: Schema.Types.ObjectId, ref: "question" }],
    author: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("questionnaire", questionnaire);
