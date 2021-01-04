const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption")
  .fieldEncryption;
const Schema = mongoose.Schema;

//All required fields are encrypted. According to hippa guidelines. For understanding the library. Check on npm
const appointment = new Schema(
  {
    forWhom: { type: String }, //Determine for whom this appointment is booked
    patientInfo: { type: Object }, //All details for patient,
    bookedOn: { type: Date },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    doctor: { type: Schema.Types.ObjectId, ref: "Practise" },
    bookedFor: { type: Date, default: Date.now() },

    cancelledBy: {
      cancelledByPatient: { type: Boolean, default: false },
      cancelledByDoctor: { type: Boolean, default: false },
      patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
      reason: { type: String }
    },
    ongoing:{type:Boolean},
    transactionId: { type: String },
    availabilitySelected: { type: String },
    paid: { type: Boolean, default: false },
    duration: { type: String },
    available: { type: Boolean },
    booked: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    viewedByPatient: { type: Boolean },
    viewedByDoctor: { type: Boolean },
    amount: { type: String },
    paidByAdmin: { type: Boolean },
    reasonForVisit: { type: String },
    description: { type: String },
    type: { type: String },
    number: { type: String },
    completed: { type: Boolean },
    quiz: [{ type: Object }], //Stores question answer of patient on doctor quiz
    medicines: { type: Schema.Types.ObjectId, ref: "Medicine" } // Medicines prescribed by doctor
  },
  { timestamps: true }
);

appointment.plugin(mongooseFieldEncryption, {
  fields: [
    "forWhom",
    "bookedOn",
    // 'patient',
    // 'doctor',
    // "bookedFor",
    "cancelledByPatient",
    "cancelledByDoctor",
    "transactionId",
    "reasonForCancellation",
    "availabilitySelected",
    "paid",
    "duration",
    "available",
    // "booked",
    "approved",
    "viewedByPatient",
    "viewedByDoctor",
    "amount",
    "paidByAdmin",
    "reasonForVisit",
    "description",
    "type",
    "number",
    "completed"
    // "quiz"
  ],
  secret: "some secret key",
  saltGenerator: function(secret) {
    return "1234567890123456"; // should ideally use the secret to return a string of length 16
  }
});

module.exports = mongoose.model("Appointments", appointment);
