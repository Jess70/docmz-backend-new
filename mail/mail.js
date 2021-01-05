let nodemailer = require("nodemailer");
let ejs = require("ejs");

let smtpConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL,
  // you can try with TLS, but port is then 587
  auth: {
    user: "code.rockzo@gmail.com", // Your email id
    pass: "Rockzo!@77" // Your password
  },
  tls: {
    rejectUnauthorized: false
  }
};
let transporter = nodemailer.createTransport(smtpConfig);
// 	from: "code.rockzo@gmail.com", // sender address
// 	to: result.email, // list of receivers
// 	subject: "Appointment booked - DocMz", // Subject line
// 	text: "this is some text", //, // plaintext body
// 	// html,
// };

//Centralised mailing for all, just use the function send and pass the required data

const send = (subject, email, html) => {
  // console.log("I am in mail");
  let mailOptions = {
    from: "code.rockzo@gmail.com", // sender address
    to: email, // list of receivers
    subject, // Subject line
    // text, //, // plaintext body
    html
  };
  // console.log({ mailOptions });
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      // return false;
      // console.log({ error });
    } else {
      // console.log("Message sent: " + info.response);
      // return true;
    }
    // console.log("Message sent");
  });
};

module.exports = send;
