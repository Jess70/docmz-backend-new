const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//This model is created for question. As option can be of different types. Therefore, we have kept optionType in option instead of question.
//Root question denotes whether its the first question or not
//Parent denotes the question from which its linked with
//Specilty and category denotes type of questionnaire.
const question = new Schema(
  {
    title: { type: String },
    superQuestion: { type: Boolean },
    option: [
      {
        optionType: { type: String },
        text: { type: String },
        linkedQuestion: [{ type: Schema.Types.ObjectId, ref: "question" }]
      }
    ],
    specialty: { type: String },
    category: { type: String },
    parent: { type: Schema.Types.ObjectId },
    optionText: { type: String },
    root: { type: Boolean, default: false } //Set true is its a root question
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", question);
