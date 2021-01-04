const userController = require("../users/users.controller");
const testController = require("../users/test");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("_helpers/db");
const User = db.User;
const Usermeta = db.Usermeta;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/patient/image");
  },
  filename: (req, file, cb) => {
    let filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".pdf") {
      req.fileValidationError = "Forbidden extension";
      return callback(null, false, req.fileValidationError);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 420 * 150 * 200
  }
});

// Register an User
router.post("/register", userController.register);

//Authenticate an User
router.post("/authenticate", userController.authenticate);

//Update Profile
router.post("/update", userController.updateProfile);

//Forget password route
router.post("/forgetpassword", userController.tokenForgetPassword);

//Set password Route
router.post("/setpassword", userController.setPassword);

//get patient details
router.get("/getinfo/:id", userController.getProfileDetails);
//get full patient details
router.get("/getfullinfo/:id", userController.getfullProfileDetails);

router.post("/upload/image", upload.any(), (req, res, next) => {
  console.log("it came here");
  const file = req.files;
  console.log(file);
  const id = req.body.id;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        picture: req.files[0].path
        // __enc_picture: false,
      }
    },
    { new: true }
  )
    .then(data => {
      res
        .status(200)
        .json({ status: true, message: "Image uploaded successfully", data });
    })
    .catch(error => {
      res.status(200).json({ status: false, message: error });
    });
  // res.send(file);
});

//Delete a Picture
router.post("/picture/delete", (req, res) => {
  let { id, query } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { $pull: { picture: query } },
    { new: true }
  )
    .then(data => {
      res
        .status(200)
        .json({ status: true, message: "Image deleted successfully", data });
    })
    .catch(error => {
      res.status(200).json({ status: false, message: error });
    });
});

router.post("/attempt", userController.attemptQuiz);

//Upload records

let recordsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/patient/records");
  },
  filename: (req, file, cb) => {
    let filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + Date.now() + path.extname(file.originalname));
  }
});

let recordsUpload = multer({
  storage: recordsStorage,
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      req.fileValidationError = "Please upload file in PDF format";
      return callback(null, false, req.fileValidationError);
    }
    callback(null, true);
  }
  // limits: {
  // 	fileSize: 420 * 150 * 200,
  // },
});

router.post("/upload/records", recordsUpload.any(), (req, res) => {
  if (req.files.length > 0) {
    let { id } = req.body;
    let data = {
      document: req.body.document,
      path: req.files[0].path,
      Date: Date.now(),
      description: req.body.description || "NA"
    };

    User.findOneAndUpdate(
      { _id: id },
      { $push: { records: data } },
      { new: true }
    )
      .then(data => {
        res
          .status(200)
          .json({ status: true, message: "Successfully added record", data });
      })
      .catch(error => {
        res.status(500).json({ status: false, message: error });
      });
  } else {
    res.status(500).json({ status: false, message: "Please select a file" });
  }
});
// exporting them

router.post("/favourite/add", userController.addFavourite);
router.post("/favourite/remove", userController.removeFavourite);

router.post("/medicalInfo/add", userController.addMedicalInfo);

let idstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/patient/document");
  },
  filename: (req, file, cb) => {
    let filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + Date.now() + path.extname(file.originalname));
  }
});

let idupload = multer({
  storage: idstorage,
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      req.fileValidationError = "Forbidden extension";
      return callback(null, false, req.fileValidationError);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 420 * 150 * 200
  }
});

router.post("/add/identity", idupload.any(), (req, res) => {
  if (req.files.length > 0) {
    let { id } = req.body;

    const path = req.files[0].path;

    Usermeta.findOneAndUpdate(
      { _id: id },
      { $push: { idProof: path } },
      { new: true }
    )
      .then(data => {
        res
          .status(200)
          .json({ status: true, message: "Successfully added record" });
      })
      .catch(error => {
        res.status(500).json({ status: false, message: error });
      });
  } else {
    res.status(500).json({ status: false, message: "Please select a file" });
  }
});

//-------------member-----------------

router.post("/member/get", userController.getMember);
router.post("/member/update", userController.updateMember);
router.post("/member/delete", userController.deleteMember);
router.post("/member/add", userController.addMember);

router.post("/test/add", testController.add);
router.post("/test/get", testController.get);
router.post("/test/update", testController.update);

//-----------meta---------------------------
router.post("/meta/get", userController.getMeta);

router.post("/specialty/get", userController.getSpecialty);
router.post("/familyhistory/add", userController.addFamilyHistory);
router.post("/surgeries/add", userController.addSurgeries);

router.post("/reports/add", upload.any(), async (req, res) => {
  try {
    console.log(req.body);
    let { data, id } = req.body;
    const file = req.files;

    if (!file) {
      return res.status(400).json({
        status: false,
        message: "Please upload a file"
      });
    }
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    data.report_img = req.files[0].path;
    console.log(data);

    let usermeta = await Usermeta.findById(id);
    console.log(usermeta);

    usermeta.reports.push(data);
    usermeta.save(function(err) {
      if (err) {
        res.status(500).json({
          status: false,
          err: err,
          message: "Something went wrong"
        });
      }
      res
        .status(200)
        .json({ status: true, message: "Successfully updated data", data: usermeta.reports});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      err: err,
      message: "Something went wrong"
    });
  }
});

router.get("/familyhistory/get/:id", userController.getFamilyHistory);
router.get("/surgeries/get/:id", userController.getSurgeries);
router.get("/reports/get/:id", userController.getReports);

router.post("/addrecentdoctor", userController.addRecentDoctor);
router.get("/recentdoctors/:id", userController.recentDoctors);

router.get("/appointments/:id", userController.getAppointment);
module.exports = router;
