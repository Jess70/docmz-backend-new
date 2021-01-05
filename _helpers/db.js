const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://dev:dev123@docmz-shard-00-00-fdoxl.mongodb.net:27017,docmz-shard-00-01-fdoxl.mongodb.net:27017,docmz-shard-00-02-fdoxl.mongodb.net:27017/docmz?ssl=true&replicaSet=DocMz-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

// const MongoClient = require('mongoose')
// const uri = "mongodb+srv://dev:dev123@docmz-fdoxl.mongodb.net/admin?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// mongoose.connect(process.env.DB_CONN);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model"),
  indexCpt: require("../codes/indexCpt.model"),
  Cpt: require("../codes/cpt.model"),
  Practise: require("../doctor/practice.model"),
  Appointment: require("../appointments/appointment.model"),
  Taxonomy: require("../doctor/taxonomies.model"),
  Address: require("../doctor/address.model"),
  ICD10Index: require("../codes/icd10Index.model.js"),
  ICD10: require("../codes/icd10.model.js"),
  Speciality: require("../codes/speciality.model.js"),
  Carriers: require("../insurance/carriers.model"),
  Plans: require("../insurance/plan.model"),
  Procedure: require("../doctor/procedure.model"),
  Specialty: require("../doctor/specialty.model"),
  Payment: require("../payment/model/payment.model"),
  Admin: require("../admin/admin.model"),
  Question: require("../questionnaire/question.model"),
  Usermeta: require("../users/usermeta.model"),
  Medicine: require("../medicine/medicine.model"),
  Referral: require("../referral/referral.model"),
  Member: require("../users/member.model"),
  Otp: require("../otp/otp.model"),
  Clinic: require("../clinic/clinic.model"),
  practiseMeta: require("../doctor/practicemeta.model"),
  Review: require("../reviews/reviews.model")
};
