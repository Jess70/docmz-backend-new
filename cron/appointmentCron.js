const cron = require("node-cron");
const moment = require("moment");
let { Scheduler } = require("@ssense/sscheduler");

const db = require("_helpers/db");
const Practise = db.Practise;
const AppointmentModel = db.Appointment;

//In every 5 mins it adds latest 3 appointments in latestappointment array of doctor
// console.log("appointmentcron");
cron.schedule("*/5 * * * *", async () => {
  Practise.find()
    .populate({
      path: "appointments",
      match: { booked: false }
    })
    .then(async docs => {
      for await (const data of docs) {
        let curAppoint = data.appointments.slice(0, 3);
        await Practise.findOneAndUpdate(
          { _id: data._id },
          { latestAppointment: curAppoint },
          { new: true }
        )
          .then(result => {
            // console.log(result);
          })
          .catch(err => {
            // console.log(err);
          });
      }
    })
    .catch(err => {
      // console.log(err);
    });
});
