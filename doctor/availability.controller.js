let { Scheduler } = require("@ssense/sscheduler");
let AppointmentModel = require("../appointments/appointment.model");
let Practise = require("./practice.model");

let moment = require("moment");

const data = {
  duration: "15",
  weekdaysArr: [
    {
      days: ["wednesday", "thursday", "friday"],
      startTime: "02:30",
      endTime: "11:30",
      lunchStart: "06:30",
      lunchEnd: "07:30"
    },
    {
      days: ["monday", "tuesday"],
      startTime: "03:30",
      endTime: "12:30",
      lunchStart: "06:30",
      lunchEnd: "07:30"
    }
  ]
};
// Create time slots for doctor
let getTimeSlots = id => {
  //USE THIS AS PAYLOAD
  //  {
  //     duration: "15",
  //     id:""
  //     weekdaysArr: [
  //       {
  //         days: ["wednesday", "thursday", "friday"],
  //         startTime: "02:30",
  //         endTime: "11:30",
  //         lunchStart: "06:30",
  //         lunchEnd: "07:30"
  //       },
  //       {
  //         days: ["monday", "tuesday"],
  //         startTime: "03:30",
  //         endTime: "12:30",
  //         lunchStart: "06:30",
  //         lunchEnd: "07:30"
  //       }
  //     ]
  //   };

  let currentDate = moment().format("YYYY-MM-DD");

  moment.addRealMonth = function addRealMonth(d) {
    var fm = moment(d).add(1, "M");
    var fmEnd = moment(fm).endOf("month");
    return d.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
      ? fm.add(1, "d")
      : fm;
  };

  let futureMonth = moment.addRealMonth(moment()).format("YYYY-MM-DD");

  //Current Date
  // console.log(currentsDate);

  //Future Month
  // console.log(futureMonth);

  //Construct Schedule
  let objArray = [];
  data.weekdaysArr.map(el => {
    // console.log({ el });
    let obj = {};
    el.days.map(day => {
      // console.log({ day });
      obj.from = el.startTime;
      obj.to = el.endTime;
      obj.unavailability = [
        {
          from: el.lunchStart,
          to: el.lunchEnd
        }
      ];

      objArray.push({ [day]: obj });
    });
  });

  setTimeout(function() {
    testArray = Object.assign({}, ...objArray);

    let { duration, interval } = data;
    const scheduler = new Scheduler();
    const availability = scheduler.getAvailability({
      from: currentDate,
      to: futureMonth,
      duration,
      interval: duration,
      schedule: testArray
    });
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

        timeModel.save().then(app => {
          // console.log("appointments");
          // console.log(app);
        });
        // console.log({ timeModel, myDate, el });
        timeSlotsArray.push(timeModel._id);
      });
    });

    let RenewDate = availabilityDates.pop();
    // console.log({ RenewDate });
    setTimeout(function() {
      Practise.findByIdAndUpdate(
        id,
        {
          $set: {
            appointments: timeSlotsArray,
            latestAppointment: timeSlotsArray.slice(0, 3)
            // appointmentsString: JSON.stringify(req.body),
          }
        },
        { new: true }
      )
        .then(result => {
          console.log("in timeslot");
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });

      Practise.findById(id).then(data => {
        test = data;
      });

      //This is how dates should be read from the server
      // let date123 = new Date("2019-11-18T04:00:00.000Z")
      // console.log({"read this":date123.toLocaleTimeString()})

      // console.log({ timeSlotsArray });
    }, 3000);

    // res.json({ status: true, message: "Time Slots Saved", data: availability });
  }, 3000);
};

module.exports = {
  getTimeSlots
};
