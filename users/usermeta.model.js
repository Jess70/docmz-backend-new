const mongoose = require("mongoose");
const mongooseFieldEncryption = require("mongoose-field-encryption")
  .fieldEncryption;
const Schema = mongoose.Schema;

const Usermeta = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Patient" },
  referralId: { type: String, required: true, unique: true },
  referrals: [{ type: Schema.Types.ObjectId, ref: "Referral" }], // list of all users/doc referred by this user
  idProof: { type: String }, //Any identity proof for valdation
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }], //list of all family/friend
  //Below field shows full history of medical info
  recentDoctors: [
    {
      doctor: { type: Schema.Types.ObjectId, ref: "Practise" },
      appointment: { type: Schema.Types.ObjectId, ref: "Appointments" },
      createdAt: { type: Date, default: Date.now() }
    }
  ],
  weight: [
    {
      value: { type: String },
      practiseName: { type: String },
      practise: { type: Schema.Types.ObjectId, ref: "Practise" },
      modifiedBy: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  height: [
    {
      value: { type: String },
      practise: { type: Schema.Types.ObjectId, ref: "Practise" },
      practiseName: { type: String },
      modifiedBy: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  heartRate: [
    {
      value: { type: String },
      practise: { type: Schema.Types.ObjectId, ref: "Practise" },
      practiseName: { type: String },
      modifiedBy: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  bloodPressure: [
    {
      value: { type: String },
      practise: { type: Schema.Types.ObjectId, ref: "Practise" },
      practiseName: { type: String },
      modifiedBy: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  temperature: [
    {
      value: { type: String },
      practise: { type: Schema.Types.ObjectId, ref: "Practise" },
      practiseName: { type: String },
      modifiedBy: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  respiration: [
    {
      value: { type: String },
      practise: { type: Schema.Types.ObjectId, ref: "Practise" },
      practiseName: { type: String },
      modifiedBy: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  oxygen: [
    {
      value: { type: String },
      practise: { type: Schema.Types.ObjectId, ref: "Practise" },
      practiseName: { type: String },
      modifiedBy: { type: String },
      date: { type: Date, default: Date.now() }
    }
  ],
  bloodSugar:[{
    value:{
			mg:{type:String},
			mmol:{type:String}
		},
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
  }],
  medicines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Medicine"
    }
  ],
  surgeries: {
    type: Array
  },
  family_history: {
    type: Array
  },
  reports: {
    type: Array
  }
});

Usermeta.plugin(mongooseFieldEncryption, {
  fields: [
    "weight",
    "height",
    "heartRate",
    "bloodPressure",
    "temperature",
    "respiration",
    "oxygen",
    "idProof",
    "surgeries",
    "family_history",
    "reports",
    "medicines"
  ],
  secret: "some secret key",
  saltGenerator: function(secret) {
    return "1234567890123456"; // should ideally use the secret to return a string of length 16
  }
});
module.exports = mongoose.model("Usermeta", Usermeta);
