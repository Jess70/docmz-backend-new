const db = require("_helpers/db");
const User = db.User;
const Student = db.Student;
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
var key = "abcdefghijklmnopqrstuvwxyztgbhgf"; //  should be of 32 digits
let iv = "1234567891234567";
const cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
const decipher = crypto.createDecipheriv(algorithm, new Buffer.from(key), iv);


//function to get all students
function getall(req, res) {
  Student.find()
    
    .exec(function(err, user) {
      if (user) {
        res.json({ status: true, students: user });
      } else {
        res.json({ status: false, error: "Students not found" });
      }
    });
}


//Function to get Students
function getStudent(req, res) {
  User.find({ _id: req.body.id, role: "parent" })
    .populate("students")
    .exec(function(err, user) {
      if (user) {
        res.json({ status: true, students: user });
      } else {
        res.json({ status: false, error: "User not found" });
      }
    });
}

//Function to edit students
async function editStudent(req, res) {
  
  let id = req.body.id;
  // validate the input
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();

  // check the validation object for errors
  let errors = req.validationErrors();

  if (errors) {
    res.json({ status: false, messages: errors });
  } else if(req.body.username == req.body.newusername){
    let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
      var encrypted2 =
        cipher.update(req.body.password, "utf8", "hex") + cipher.final("hex"); 
    await Student.findByIdAndUpdate(
        id,
        {
          $set: {  password: encrypted2 }
        },
        {
          new: true
        }
      )
        .then(student => res.json({ status: true, student: student }))
        .catch(err => res.json({ status: false, error: err }));
    } else if (await Student.findOne({ username: req.body.newusername }) || await User.findOne({ username: req.body.newusername })) {
      res
        .status(200)
        .json({
          status: false,
          error: "Username " + req.body.newusername + " is already taken"
        });
    } else {
      let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
      var encrypted =
        cipher.update(req.body.password, "utf8", "hex") + cipher.final("hex");
      Student.findByIdAndUpdate(
        id,
        {
          $set: { username: req.body.newusername, password: encrypted }
        },
        {
          new: true
        }
      )
        .then(student => res.json({ status: true, student: student }))
        .catch(err => res.json({ status: false, error: err }));
    }
  }


//Function to create students
async function createStudent(req, res) {
  // validate
  if (
    (await Student.findOne({ username: req.body.username })) ||
    (await User.findOne({ username: req.body.username }))
  ) {
    res
      .status(200)
      .json({
        status: false,
        error: "Username " + req.body.username + " is already taken"
      });
  } else {
    let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
    var encrypted =
      cipher.update(req.body.password, "utf8", "hex") + cipher.final("hex");

      let parentid = req.body.parentid;
    User.findById(parentid).then(user => check(user));

    function check(user) {
      let student = new Student({
        username: req.body.username,
        email: req.body.email,
        password: encrypted,
        parents: user.id
      });

      User.findByIdAndUpdate(
        parentid,
        { $push: { students: student._id } },
        { new: true }
      )
        .then(user => res.json({ status: true, user: user }))
        .catch(err => res.json({ status: false, error: err }));

      student.save().then((data) => console.log(data)).catch((err) => console.log(err));
    }
  }
}

//Function for changing the student plan
function changePlan(req, res) {
  let id = req.body.id;
  Student.findByIdAndUpdate(
    id,
    {
      $set: { package: req.body.plan }
    },
    { new: true }
  )
    .then(stud => res.json({ status: true, students: stud }))
    .catch(err => res.json({ status: false, error: err }));
}

//Function to view students credentials
function viewStudent(req, res) {
  let id = req.body.id;
  Student.findById(id)
    .then(users => res.json({ status: true, user: showStudent(users) }))
    .catch(err => res.json({ status: false, error: err }));
  //Function to show it
  function showStudent(users) {
    let password = users.password;
    let decipher = crypto.createDecipheriv(algorithm, new Buffer.from(key), iv);
    let decrypted =
      decipher.update(password, "hex", "utf8") + decipher.final("utf8");
    return decrypted;
  }
}

// function editStudent(req, res) {
// 	Student.findOneAndUpdate({ email: req.body.email }, { $set: { firstName: req.body.firstname } })
// 		.then((user) => res.json({ status: true, user: user }))
// 		.catch((err) => res.json({ status: false, error: err }));
// }

//Exporting all the functions
module.exports = {
  getStudent,
  createStudent,
  changePlan,
  viewStudent,
  editStudent,
  getall
};
