const npiController = require('../doctor/practice.controller');
const doctorController = require('../doctor/doctor.controller');
const doctormetaController = require('../doctor/practicemeta.controller');
const express = require('express');
const router = express.Router();
const db = require('_helpers/db');
const Practise = db.Practise;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const practicemetaController = require('../doctor/practicemeta.controller');
// Fetch info about an doctor through a NPI Number
router.get('/getInfo/:npi', npiController.getNpiInfo);

//Upload Doctors to the database through a list of NPI
router.get('/upload', npiController.addDoctors);

//Get all the doctors
router.get('/get', npiController.getAllDoctors);

//Get all procedures
router.get('/get/procedures', doctorController.getProcedures);

//Add all Procedures
router.get('/upload/procedures', doctorController.addProcedures);

//Upload Specialties
router.get('/upload/specialties', doctorController.addSpecialities);

//Get Specialities
router.get('/get/specialties', doctorController.getSpecialty);

// Set Device token for Firebase messaging Admin SDK

router.post('/setDeviceToken', doctorController.setDeviceToken);

//register a Doctor
router.post('/register', npiController.signUpDoc);

//Authenticate a doctor
router.post('/authenticate', npiController.authenticateDoctor);

//Update Doctors profile
router.post('/profile/update', npiController.profileUpdate);

//Create and save slots
router.post('/saveslots', npiController.saveSlots);

//Get a doctor through id
router.get('/getdoc/:id', npiController.getDoc);

//Search Doctors
router.post('/search', npiController.searchDocs);

router.post('/searchlite', npiController.searchDocsLite);

//Upload picture

//Multer storage route
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/doctors/image');
	},
	filename: (req, file, cb) => {
		let filename = file.originalname.split('.')[0];
		cb(null, filename + '-' + Date.now() + path.extname(file.originalname));
	},
});

let upload = multer({
	storage: storage,
	fileFilter: function(req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
			req.fileValidationError = 'Forbidden extension';
			return callback(null, false, req.fileValidationError);
		}
		callback(null, true);
	},
	limits: {
		fileSize: 420 * 150 * 200,
	},
});

//Uplaod a picture to doctors profile
router.post('/upload/image', upload.any(), (req, res) => {
	console.log('I am in image');
	console.log(req.files);

	if (req.files.length > 0) {
		let { id } = req.body;
		Practise.findOneAndUpdate(
			{ _id: id },
			{ $push: { picture: req.files[0].path } },
			{ new: true },
		)
			.then((data) => {
				res.status(200).json({
					status: true,
					message: 'Image uploaded successfully',
					data,
				});
			})
			.catch((error) => {
				res.status(200).json({ status: false, message: error });
			});
	} else {
		res.status(500).json({
			message: 'Please select an image',
			status: false,
		});
	}
});

let vupload = multer({
	storage: storage,
	fileFilter: function(req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== '.mp4') {
			req.fileValidationError = 'Forbidden extension';
			return callback(null, false, req.fileValidationError);
		}
		callback(null, true);
	},
	limits: {
		fileSize: 420 * 150 * 200,
	},
});

router.post('/video', vupload.any(), (req, res) => {
	if (req.fileValidationError) {
		res.status(500).json({
			status: false,
			message: req.fileValidationError,
		});
	}
	if (req.files.length > 0) {
		let { id } = req.body;
		console.log(req.body);
		Practise.findOneAndUpdate(
			{ _id: id },
			{ video: req.files[0].path },
			{ new: true },
		)
			.then((data) => {
				res.status(200).json({
					status: true,
					message: 'video uploaded successfully',
					data,
				});
			})
			.catch((error) => {
				res.status(500).json({
					status: false,
					message: 'something went wrong',
				});
			});
	} else {
		res.status(500).json({
			status: false,
			message: 'Please select a file',
		});
	}
});

//Delete a Picture
router.post('/picture/delete', (req, res) => {
	let { id, query } = req.body;

	Practise.findOneAndUpdate(
		{ _id: id },
		{ $pull: { picture: query } },
		{ new: true },
	)
		.then((data) => {
			res.status(200).json({
				status: true,
				message: 'Image deleted successfully',
				data,
			});
		})
		.catch((error) => {
			res.status(200).json({ status: false, message: error });
		});
});

//Upload document
let dstorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/doctors/document');
	},
	filename: (req, file, cb) => {
		let filename = file.originalname.split('.')[0];
		cb(null, filename + '-' + Date.now() + path.extname(file.originalname));
	},
});

let dupload = multer({
	storage: dstorage,
	// fileFilter: function(req, file, callback) {
	// 	var ext = path.extname(file.originalname);
	// 	if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
	// 		req.fileValidationError = "Forbidden extension";
	// 		return callback(null, false, req.fileValidationError);
	// 	},	callback(null, true);
	// },
	// limits: {
	// 	fileSize: 420 * 150 * 200,
	// },
});

router.post('/upload/document', dupload.any(), (req, res) => {
	console.log('upload document', req.body);
	if (req.fileValidationError) {
		res.status(500).json({
			status: false,
			message: req.fileValidationError,
		});
	}
	if (req.files.length > 0) {
		let { id, docName } = req.body;
		console.log(req.body);
		Practise.findOneAndUpdate(
			{ _id: id },
			{ [docName]: req.files[0].path, [`document.${docName}`]: true },
			{ new: true },
		)
			.then((data) => {
				res.status(200).json({
					status: true,
					message: 'document uploaded successfully',
					data,
				});
			})
			.catch((error) => {
				res.status(500).json({
					status: false,
					message: 'something went wrong',
				});
			});
	} else {
		res.status(500).json({
			status: false,
			message: 'Please select a file',
		});
	}
});

router.post('/appointment/next', npiController.nextAppointment);

router.post('/appointment/date', npiController.getByDate);

router.post('/forgetpassword', npiController.tokenForgetPassword);

router.post('/setpassword', npiController.setPassword);

router.post('/addrecentpatient', practicemetaController.addrecentpatient);
router.get('/recentpatients/:id', practicemetaController.recentpatients);
router.post('/toggleblock', npiController.toggleBlock);
router.get('/appointments/:id', npiController.getAppointment);
// exporting them
module.exports = router;
