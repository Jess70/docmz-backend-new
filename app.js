require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const expressValidator = require("express-validator");
// app.use(expressValidator());
const cors = require("cors");

const cron = require("./cron/cron");
const appointcron = require("./cron/appointmentCron");

const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieparser());
// app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cors({ origin: "*:*" }));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);
app.use(express.static("public"));

// const readfile = require("./readfile"); //Uncomment this while reading from excel file

// var socket = require('socket.io');

// start server
// const port = process.env.PORT || 4000;
// const server = app.listen(process.env.PORT, function() {
// 	console.log(`Server listening on port ${process.env.PORT}`);
// });

// var server = http.createServer(app);
// io = socket(server);

// require('./socket/socket')(io);

// // middleware function to check for logged in users
// let sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/');
//     } else {
//         next();
//     }
// };

// // middleware for checking if the cookie information is saved or not
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');
//     }
//     next();
// });

// use JWT auth to secure the api
app.use(jwt());

app.use("/questionnaire", require("./routes/questionnaire_route"));

// NPI
app.use("/doctors", require("./routes/doctor_routes.js"));

//Codes
app.use("/codes", require("./routes/codes_routes"));

//Insurance
app.use("/insurance", require("./routes/insurance_routes"));

//User Routes
app.use("/patient", require("./routes/user_routes"));

//Stripe Routes
app.use("/Stripe", require("./routes/stripe_routes"));

//Razorpay Routes
app.use("/razorpay", require("./routes/razorpay_routes"));

//Payment Routes
app.use("/payment", require("./routes/payment_routes"));
//Appointment Routes
app.use("/appointment", require("./routes/appointment_routes"));

app.use("/medicine", require("./routes/medicine_route"));

app.use("/admin", require("./routes/admin_routes"));

app.use("/referral", require("./routes/referral_routes"));

app.use("/team", require("./routes/teams_route"));

app.use("/otp", require("./routes/otp_routes"));

app.use("/clinic", require("./routes/clinic_routes"));

app.use(errorHandler);

module.exports = app;
