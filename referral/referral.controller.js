const db = require("../_helpers/db");
const Referral = db.Referral,
  Usermeta = db.Usermeta,
  Practise = db.Practise,
  User = db.User;
const _ = require("underscore");

//when someone fills a form for some user who is not on platform yet

const add = (req, res) => {
  const { referrerType, referralId, email } = req.body;
  const referral = new Referral({ ...req.body });
  referral
    .save()
    .then(result => {
      console.log(result);
      if (referrerType === "Practise") {
        console.log("Practise");
        Practise.findOne({ email }).then(user => {
          if (_.isEmpty(user)) {
            Practise.findOneAndUpdate(
              { referralId: referralId },
              { $push: { referrals: result._id } },
              { new: true }
            )
              .then(refresult => {
                console.log("refresult", refresult);
                res.status(200).json({
                  status: true,
                  message: "Successfully submitted form"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  status: false,
                  message: "Something went wrong",
                  err: err
                });
              });
          } else {
            res.status(200).json({
              status: false,
              message: "User with this mail already exist"
            });
          }
        });
      } else {
        User.findOne({ email }).then(user => {
          if (_.isEmpty(user)) {
            Usermeta.findOneAndUpdate(
              { referralId: referralId },
              { $push: { referrals: result._id } },
              { new: true }
            )
              .then(refresult => {
                console.log("refresult", refresult);
                res.status(200).json({
                  status: true,
                  message: "Successfully submitted form"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  status: false,
                  message: "Something went wrong",
                  err: err
                });
              });
          } else {
            res.status(200).json({
              status: false,
              message: "User with this mail already exist"
            });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: false,
        message: "Something went wrong",
        err: err
      });
    });
};

module.exports = {
  add
};
