// const db = require('_helpers/db'),
// 	User = db.User,
// 	Student = db.Student,
// 	async = require('async'),
// 	nodemailer = require('nodemailer'),
// 	crypto = require('crypto'),
// 	algorithm = 'aes-256-cbc';
// var key = 'abcdefghijklmnopqrstuvwxyztgbhgf';
// let iv = '1234567891234567';
// let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
// 	'1046438206668-j9jojvn8hcc3dd7d32p8fn1ed2g7vqbs.apps.googleusercontent.com', // ClientID
// 	'5IyyBQxJI9I44XzoLbRv0AO3', // Client Secret
// 	'https://developers.google.com/oauthplayground' // Redirect URL
// );

// //Refreshing the tokens
// oauth2Client.setCredentials({
// 	refresh_token: '1/5TaFf1UzWmH10uDIuN1kBtieOvS6FO0mGRGxXxn9dwo'
// });
// let tokens;
// let smtpTransport;
// oauth2Client.refreshAccessToken().then(function(res) {
// 	if (!res.tokens && !res.credentials) {
// 		throw Error('No access token returned.');
// 	}
// 	tokens = res.credentials;
// 	console.log({ credentials: res.credentials });
// 	console.log({ access: tokens.access_token });
// 	smtpTransport = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			type: 'OAuth2',
// 			user: 'admin@thirdessential.com',
// 			clientId: '1046438206668-j9jojvn8hcc3dd7d32p8fn1ed2g7vqbs.apps.googleusercontent.com',
// 			clientSecret: '5IyyBQxJI9I44XzoLbRv0AO3',
// 			refreshToken: '1/5TaFf1UzWmH10uDIuN1kBtieOvS6FO0mGRGxXxn9dwo',
// 			accessToken: tokens.access_token
// 		}
// 	});
// });

// //Function to cdreate a random alphanumeric string
// function stringGen(len) {
// 	var text = ' ';
// 	var charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
// 	for (var i = 0; i < len; i++)
// 		text += charset.charAt(Math.floor(Math.random() * charset.length));
// 	return text;
// }

// //Function to edit users credentials
// function edituser(email, type, newemail, newpassword) {
// 	var encrypted = cipher.update(newpassword, 'utf8', 'hex') + cipher.final('hex');
// 	User.findOneAndUpdate(
// 		{ email: email, role: type },
// 		{
// 			$set: { email: newemail, password: encrypted }
// 		}
// 	);
// }

// //Function to get all the verified parents
// async function getParents_verified() {
// 	return await User.find({ role: 'parent', status: 'Approved' }).select('-1');
// }

// //Function to get all the unverified parents
// async function getParents_Nverified() {
// 	return await User.find({ role: 'parent', status: 'Declined' });
// }

// //Function to get all the verified admins
// async function getadmin_verified() {
// 	return await User.find({ role: 'admin', status: 'Approved' });
// }

// //Function to get all the unverified admins
// async function getadmin_Nverified() {
// 	return await User.find({ role: 'admin', status: 'Declined' });
// }

// //Function to get all the verified teachers
// async function getTeachers_verified() {
// 	return await User.find({ role: 'teacher', status: 'Approved' });
// }

// //Function get all the unverified teachers
// async function getTeachers_Nverified() {
// 	return await User.find({ role: 'teacher', status: 'Declined' });
// }

// //Function to get all users by id
// async function getById(id) {
// 	return await User.findById(id).select('-hash');
// }

// //Function to register a new user
// async function create(req, res, userParam) {
// 	if (req.body.superadmin) {
// 		req.checkBody('username', 'Username is required').notEmpty();
// 		req.checkBody('password', 'password is required').notEmpty();
// 		req.checkBody('role', 'Role is required').notEmpty();
// 		let errors = req.validationErrors();

// 		if (errors) {
// 			res.json({ status: false, messages: errors });
// 		} else {
// 			if (
// 				(await User.findOne({ username: userParam.username })) ||
// 				(await Student.findOne({ username: userParam.username }))
// 			) {
// 				res.status(200).json({
// 					status: false,
// 					error: 'Username ' + userParam.username + ' is already taken'
// 				});
// 			} else {
// 				const user = new User(userParam);
// 				// hash password
// 				if (userParam.password) {
// 					let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
// 					var encrypted =
// 						cipher.update(userParam.password, 'utf8', 'hex') + cipher.final('hex');
// 					user.password = encrypted;
// 					// user.password = bcrypt.hashSync(userParam.password, 10);
// 				}

// 				if (userParam.role == 'admin') {
// 					user.status = 'Approved';
// 				}
// 				console.log(userParam);
// 				// save user
// 				await user
// 					.save()
// 					.then(() => res.json({ status: true }))
// 					.catch((err) => res.json(err));
// 			}
// 		}
// 	} else {
// 		// validate the input
// 		req.checkBody('email', 'Email is required').notEmpty();
// 		req.checkBody('email', 'Email does not appear to be valid').isEmail();
// 		req.checkBody('role', 'Role is required').notEmpty();

// 		// check the validation object for errors
// 		let errors = req.validationErrors();

// 		if (errors) {
// 			res.json({ status: false, messages: errors });
// 		} else {
// 			let proc = req.body.email;
// 			let emailtolower = proc.toLowerCase();
// 			let proc2 = req.body.username;
// 			let usernametolower = proc2.toLowerCase();

// 			// validate
// 			if (
// 				(await User.findOne({ email: emailtolower })) ||
// 				(await Student.findOne({ email: emailtolower }))
// 			) {
// 				res.status(200).json({
// 					status: false,
// 					error: 'Email ' + userParam.email + ' is already taken'
// 				});
// 			} else if (
// 				(await User.findOne({ username: usernametolower })) ||
// 				(await Student.findOne({ username: usernametolower }))
// 			) {
// 				// res.status(200).json({
// 				//   status: false,
// 				//   error: "Username " + userParam.username + " is already taken"

// 				let randomStr = stringGen(5);
// 				let newusername = userParam.username + '_' + randomStr;
// 				let etst = newusername.split(' ').join('');
// 				console.log(etst);
// 				userParam.username = etst;

// 				const user = new User(userParam);
// 				// hash password
// 				if (userParam.password) {
// 					let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
// 					var encrypted =
// 						cipher.update(userParam.password, 'utf8', 'hex') + cipher.final('hex');
// 					user.password = encrypted;
// 					// user.password = bcrypt.hashSync(userParam.password, 10);
// 				}

// 				if (userParam.role == 'admin') {
// 					userParam.status = 'Approved';
// 				}
// 				// save user
// 				await user
// 					.save()
// 					.then(() => res.json({ status: true }))
// 					.catch((err) => res.json(err));
// 			}
// 		}
// 	}
// }

// //Function to update user
// async function update(id, userParam) {
// 	const user = await User.findById(id);

// 	// validate
// 	if (!user) throw 'User not found';
// 	if (
// 		user.username !== userParam.username &&
// 		(await User.findOne({ username: userParam.username }))
// 	) {
// 		throw 'Username "' + userParam.username + '" is already taken';
// 	}

// 	// hash password if it was entered
// 	if (userParam.password) {
// 		let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
// 		var encrypted = cipher.update(userParam.password, 'utf8', 'hex') + cipher.final('hex');
// 		userParam.password = encrypted;
// 	}

// 	// copy userParam properties to user
// 	Object.assign(user, userParam);
// 	await user.save();
// }

// async function TokenForgotPassword(email) {
// 	console.log('Reset password token function executed');
// 	async.waterfall(
// 		[
// 			function(done) {
// 				crypto.randomBytes(20, function(err, buf) {
// 					var token = buf.toString('hex');
// 					done(err, token);
// 				});
// 			},
// 			function(token, done) {
// 				User.findOneAndUpdate(
// 					{ email: email },
// 					{
// 						$set: {
// 							passwordtoken: token,
// 							passwordexpires: Date.now() + 3600000
// 						}
// 					}
// 				).exec(function(err, user) {
// 					done(err, token, user);
// 				});
// 			},
// 			function(token, user, done) {
// 				// var smtpTransport = nodemailer.createTransport({
// 				// 	host: 'smtp.gmail.com',
// 				// 	port: 587,
// 				// 	secure: false,
// 				// 	// port: 465,
// 				// 	// secure: true, // use SSL
// 				// 	auth: {
// 				// 		user: 'anas3rde@gmail.com',
// 				// 		pass: '8123342590'
// 				// 	}
// 				// });

// 				var mailOptions = {
// 					from: 'anas3rde@gmail.com',
// 					to: email,
// 					subject: 'Reset Password - USDE',
// 					text:
// 						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
// 						process.env.CLIENT_URL +
// 						'/users/setpassword/' +
// 						token +
// 						'\n\n'
//         };
        
// 				smtpTransport.sendMail(mailOptions, function(err) {
// 					console.log('Reset password email sent');
// 					done(err, 'done');
// 				});
// 			}
// 		],
// 		function(err) {
// 			if (err) console.log(err);
// 		}
// 	);
// }

// //Function to assign token
// async function assignToken(email) {
// 	console.log('token function executed');
// 	async.waterfall(
// 		[
// 			function(done) {
// 				crypto.randomBytes(20, function(err, buf) {
// 					var token = buf.toString('hex');
// 					done(err, token);
// 				});
// 			},
// 			function(token, done) {
// 				User.findOneAndUpdate(
// 					{ email: email },
// 					{
// 						$set: {
// 							passwordtoken: token,
// 							passwordexpires: Date.now() + 3600000
// 						}
// 					},
// 					{ new: true }
// 				).exec(function(err, user) {
// 					console.log('1');
// 					done(err, token, user);
// 					console.log('2');
// 				});
// 			},
// 			function(token, user, done) {
// 				// var smtpTransport = nodemailer.createTransport({
// 				// 	host: 'smtp.gmail.com',
// 				// 	port: 587,
// 				// 	secure: false,
// 				// 	// port: 465,
// 				// 	// secure: true, // use SSL
// 				// 	auth: {
// 				// 		user: 'anas3rde@gmail.com',
// 				// 		pass: '8123342590'
// 				// 	}
// 				// });

// 				var mailOptions = {
// 					from: 'anas3rde@gmail.com',
// 					to: email,
// 					subject: 'Test',
// 					text:
// 						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
// 						process.env.CLIENT_URL +
// 						'/users/setpassword/' +
// 						token +
// 						'\n\n'
//         };
      
// 				smtpTransport.sendMail(mailOptions, function(err) {
// 					console.log('Email sent');
// 					done(err, 'done');
// 				});
// 			}
// 		],
// 		function(err) {
// 			if (err) console.log(err);
// 		}
// 	);
// }

// //Function to set the password
// function setPassword(token, password, forget) {
// 	let cipher = crypto.createCipheriv(algorithm, new Buffer.from(key), iv);
// 	var encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
// 	// var hashp = bcrypt.hashSync(password, 10);

// 	User.findOneAndUpdate(
// 		{
// 			passwordtoken: token,
// 			passwordexpires: { $gt: Date.now() }
// 		},
// 		{
// 			$set: {
// 				password: encrypted,
// 				passwordToken: undefined,
// 				passwordExpires: undefined
// 			}
// 		},
// 		function(err, user) {
// 			// var smtptransport2 = nodemailer.createTransport({
// 			// 	host: 'smtp.gmail.com',
// 			// 	port: 587,
// 			// 	secure: false,
// 			// 	// port: 465,
// 			// 	// secure: true, // use SSL
// 			// 	auth: {
// 			// 		user: 'anas3rde@gmail.com',
// 			// 		pass: '8123342590'
// 			// 	}
//       // });
      
//       if(forget){
//         var mailOptions = {
//           to: user.email,
//           from: 'anas3rde@gmail.com',
//           subject: 'Password Changed - USDE',
//           text:
//             "Your password has been successfully changed" +
//             '\n\n' +
//             'Feel free to log in with your newly set password. You can either use your username - ' +
//             user.username +
//             ' or your email - ' +
//             user.email
//         };
//       } else {
// 			var mailOptions = {
// 				to: user.email,
// 				from: 'anas3rde@gmail.com',
// 				subject: 'Registration Successful',
// 				text:
// 					"You've been successfully registered on USDE." +
// 					'\n\n' +
// 					'Feel free to log in with your Credentials. Either use your username - ' +
// 					user.username +
// 					' or your email - ' +
// 					user.email
//       };}
    
// 			smtpTransport.sendMail(mailOptions, function(err) {
// 				done(err);
// 				res.json({ status: 'Registration complete' });
// 			});
// 		}
// 	);
// }

// //Function to delete any particular ID
// async function _delete(id) {
// 	await User.findByIdAndRemove(id);
// }

// module.exports = {
// 	getTeachers_verified,
// 	getTeachers_Nverified,
// 	getadmin_verified,
// 	getadmin_Nverified,
// 	getParents_verified,
// 	getParents_Nverified,
// 	TokenForgotPassword,
// 	getById,
// 	create,
// 	update,
// 	delete: _delete,
// 	assignToken,
// 	setPassword,
// 	edituser
// };

// //  async function verifytoken(token){
// //     console.log("from service");
// //     User.findOne({passwordtoken: token, passwordexpires: { $gt: Date.now() } }, function(err, user) {
// //         if (user) {
// //              console.log("user found");
// //         } else {
// //              console.error("No user with such token or token expired")
// //             }
// //    })};

// // async function authenticate({ username, password }) {
// //     const user = await User.findOne({ email });
// //     if (user && bcrypt.compareSync(password, user.hash)) {
// //         const { hash, ...userWithoutHash } = user.toObject();
// //         const token = jwt.sign({ sub: user.id }, config.secret);
// //         return {
// //             ...userWithoutHash,
// //             token
// //         };
// //     }
// // }
