const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const practiceMeta = new Schema({
  practiseId: { type: Schema.Types.ObjectId, ref: "Practise" },
  recentPatients: [
    {
      patient: { type: Schema.Types.ObjectId, ref: "Patient" },
      appointment: [{ type: Schema.Types.ObjectId, ref: "Appointments" }],
      createdAt: { type: Date, default: Date.now() }
    }
  ],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});
// practiceMeta.virtuals("total_rating",function(){
//   if(reviews.length>0) return reviews.rating
// })
module.exports = mongoose.model("Practisemeta", practiceMeta);
