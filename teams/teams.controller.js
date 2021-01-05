const db = require("../_helpers/db");
const Practise = db.Practise;
const _ = require("underscore");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
let key = "abcdefghijklmnopqrstuvwxyztgbhgf";
let iv = "1234567891234567";

const add = (req, res) => {
  const { parentId, email, password, firstName, lastName } = req.body;

  Practise.findOne({ email })
    .then(result => {
      if (_.isEmpty(result)) {
        let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
        var encrypted =
          cipher.update(req.body.password, "utf8", "hex") + cipher.final("hex");
        let data = {
          npi: Date.now(),
          email,
          password: encrypted,
          firstName,
          lastName,
          IsAssistant: true,
          parent: parentId
        };
        let assistant = new Practise(data);

        assistant.save().then(assistData => {
          Practise.findOneAndUpdate(
            { _id: parentId },
            { $push: { assistants: assistData._id } },
            { new: true }
          )
            .select("-appointments")
            .then(final => {
              res.status(200).json({
                status: true,
                message: "Successfully registered assistant"
                // result: final,
              });
            })
            .catch(err => {
              res.status(500).json({
                status: false,
                message: "something went wrong",
                err
              });
            });
        });
      } else {
        res.status(200).json({
          status: false,
          message: "email is already taken"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: false,
        message: "something went wrong",
        err
      });
    });
};

const update = (req, res) => {
  // req.checkBody("rights", "rights is required").notEmpty();
  // req.checkBody("id", "id is required").notEmpty();
  // let errors = req.validationErrors();
  // if (errors) {
  // 	res.status(200).json({
  // 		status: false,
  // 		message: errors,
  // 	});
  // }
  let { rights } = req.body;
  if (typeof req.body.rights === "string") {
    rights = JSON.parse(req.body.rights);
  }
  Practise.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { rights: rights } },
    { new: true }
  )
    .then(result => {
      res.status(200).json({
        message: "Updated rights",
        status: true,
        data: result
      });
    })
    .catch(err => {
      res.status(500).json({
        status: false,
        message: "something went wrong",
        err
      });
    });
};

module.exports = {
  add,
  update
};
