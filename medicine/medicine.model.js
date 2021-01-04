const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Medicine = new Schema({
  medicines: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      from: { type: Date },
      to: { type: Date },
      description: { type: String },
      time:[{type:Date}]
    }
  ],
  appointment: { type: Schema.Types.ObjectId, ref: "Appointment" },
  practise: { type: Schema.Types.ObjectId, ref: "Practise" }
});

module.exports = mongoose.model("Medicine", Medicine);
