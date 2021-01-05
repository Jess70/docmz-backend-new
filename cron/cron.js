const cron = require("node-cron");
const moment = require("moment");
let { Scheduler } = require("@ssense/sscheduler");

const db = require("_helpers/db");
const Practise = db.Practise;
const AppointmentModel = db.Appointment;
//Removes previous appointments that aren't booked and create new appointments for next day.

//Payload structure for scheduler
// const data = {
// 	duration: "15",
// 	id: "",
// 	weekdaysArr: [
// 		{
// 			days: ["wednesday", "thursday", "friday"],
// 			startTime: "02:30",
// 			endTime: "11:30",
// 			lunchStart: "06:30",
// 			lunchEnd: "07:30"
// 		},
// 		{
// 			days: ["monday", "tuesday"],
// 			startTime: "03:30",
// 			endTime: "12:30",
// 			lunchStart: "06:30",
// 			lunchEnd: "07:30"
// 		}
// 	]
// };
// “At 12:00 on every day-of-week from Monday through Friday.
cron.schedule("0 12 * * 1-5", async () => {
  main();
});

const scheduleGenerator = async data => {
  const scheduler = new Scheduler();
  const availability = scheduler.getAvailability(data);
  return Promise.resolve(availability);
};
const updateAppointment = async (availability, id) => {
  let timeSlotsArray = [];
  let availabilityDates = Object.keys(availability).map((key, index) => {
    let dash = availability[key];
    dash.map(el => {
      let timeString = key + " " + el.time + ":00";
      // console.log({ timeString });
      const myDate = moment(timeString);
      let timeModel = new AppointmentModel({
        bookedFor: myDate,
        available: el.available,
        doctor: id
      });

      timeModel.save();
      // console.log({ timeModel, myDate, el });
      timeSlotsArray.push(timeModel._id);
    });
  });
  return Promise.resolve(timeSlotsArray);
};

const updateDoctor = async (appointmentsArray, id) => {
  // console.log("got array is", appointmentsArray, "id", id);
  return Practise.findOneAndUpdate(
    { _id: id },
    { $push: { appointments: { $each: appointmentsArray } } },
    { upsert: true }
  );
};

const removeSlots = async (yesterday, today) => {
  let data = await Practise.aggregate([
    // { $match: { _id: ObjectId("5dad6ba6f4ab551864e63f00") } },
    {
      $lookup: {
        from: AppointmentModel.collection.name,
        localField: "appointments",
        foreignField: "_id",
        as: "result"
      }
    },
    {
      $match: {
        $and: [
          { "result.booked": false },
          { "result.bookedFor": { $gt: yesterday, $lt: today } }
        ]
      }
    },
    { $project: { result: 1 } }
  ]);
  // console.log("data is", data);
  for await (const doc of data) {
    // console.log("the doc", doc);
    resultId = doc.result.map(elem => {
      return elem._id;
    });
    // console.log(resultId);
    let d = await Practise.findOneAndUpdate(
      { _id: doc._id },
      { $pullAll: { appointments: resultId } },
      { upsert: true }
    );
    // console.log(d);

    let d2 = await AppointmentModel.remove({ _id: { $in: resultId } });
    // console.log(d2);
  }

  // console.log("over");
};
const main = async () => {
  // Practise.update(
  // 	{},
  // 	{
  // 		appointmentsString:
  // 			'{"duration":"15","id":"","weekdaysArr":[{"days":["wednesday","thursday","friday"],"startTime":"02:30","endTime":"11:30","lunchStart":"06:30","lunchEnd":"07:30"},{"days":["monday","tuesday"],"startTime":"03:30","endTime":"12:30","lunchStart":"06:30","lunchEnd":"07:30"}]}'
  // 	},
  // 	{ multi: true },
  // 	(err, result) => console.log(result)
  // );
  const from = moment()
    .add(7, "days")
    .format("YYYY/M/D");
  const to = moment()
    .add(8, "days")
    .format("YYYY/M/D");

  const yesterday = moment()
    .subtract(1, "days")
    .toDate();
  const today = moment().toDate;
  // console.log(yesterday);
  // console.log(today);

  let doctorsData = await Practise.find({}).select("appointmentsString");
  console.log(doctorsData);
  for (let i = 0; i < doctorsData.length; i++) {
    // console.log(i);
    // console.log("i got this", JSON.parse(doctorsData[i].appointmentsString));
    let appointmentString = JSON.parse(doctorsData[i].appointmentsString);
    let weekdays = {};
    let index = -1;
    if (appointmentString.weekdaysArr[0].days.find(el => el === today)) {
      index = 0;
    } else {
      index = 1;
    }
    weekdays.from = appointmentString.weekdaysArr[index].startTime;
    weekdays.to = appointmentString.weekdaysArr[index].endTime;
    let unavailability = [
      {
        from: appointmentString.weekdaysArr[index].lunchStart,
        to: appointmentString.weekdaysArr[index].lunchEnd
      }
    ];
    weekdays.unavailability = unavailability;
    // console.log("Weekdays", weekdays);

    let data = {
      from: from,
      to: to,
      duration: appointmentString.duration,
      interval: appointmentString.duration,
      schedule: {
        weekdays: weekdays
      }
    };
    // console.log(data);
    // creates appointments of next week
    let availibility = await scheduleGenerator(data);
    // console.log(availibility);
    //updates appointment in appointment model
    let appointmentsArray = await updateAppointment(
      availibility,
      doctorsData[i]._id
    );
    console.log(appointmentsArray);
    //update doctor appointments array.
    let Doc = await updateDoctor(appointmentsArray, doctorsData[i]._id);
    // console.log("Doc", Doc);
    console.log(i);
  }
  //Removes slots which are not booked. It removes all unbooked appointment of yesterday. Should run

  // let removePreviosSlots = await removeSlots(yesterday, today);
  console.log("done");
};
