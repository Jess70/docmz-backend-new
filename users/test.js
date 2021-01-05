const test = require("./test.model");

const add = (req, res) => {
  let data = new test(req.body);
  data.save().then(result => {
    res.json({
      result
    });
  });
};

const get = (req, res) => {
  const message = new test({ firstName: "hello" });
  message.encryptFieldsSync();
  console.log(message.firstName);
  test
    .find({ firstName: message.firstName })
    .then(result => {
      res.json({
        result
      });
    })
    .catch(err => {
      res.json({
        err
      });
    });
};

const update = (req, res) => {
  test
    .findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({
        err
      });
    });
};
module.exports = {
  add,
  get,
  update
};
