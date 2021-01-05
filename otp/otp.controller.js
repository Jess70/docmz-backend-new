var otpGenerator = require("otp-generator");
const db = require("_helpers/db");

const nodemailer = require("nodemailer");
const { Otp } = db;

//SMTP Config
let smtpConfig = {
  service: "Sendgrid",
  auth: {
    user: "klipmunk",
    pass: "klipmunk@1234"
  }
};

let Create = async (req, res) => {
  try {
    const { email } = req.body;
    const ot = new Otp({
      email,
      otp: otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false
      })
    });
    ot.save();
    let transporter = nodemailer.createTransport(smtpConfig);
    let mailOptions = {
      from: "code.rockzo@gmail.com", // sender address
      to: email, // list of receivers
      subject: "OTP - DocMz", // Subject line
      text: `otp:${ot.otp}` //, // plaintext body
      // html,
    };
    console.log({ mailOptions });
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        // return false;
        console.log({ error });
      } else {
        console.log("Message sent: " + info.response);
        // return true;
      }
      console.log("Message sent");
    });
    res.status(200).send({ status: "Mail Sent" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
let Verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const ot = await Otp.findOne({
      $and: [{ email }, { otp }]
    });
    if (ot) {
      if (ot.verify === false) {
        ot.verify = true;
        ot.save(function(err) {
          if (err) console.log(err);
          return res.send({ status: true, message: "Otp verified" });
        });
      } else {
        return res.send({ status: false, message: "Otp Already Verified" });
      }
    } else {
      return res.send({ status: false, message: "Wrong OTP" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = {
  Create,
  Verify
};
