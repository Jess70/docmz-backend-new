const mongoose = require('mongoose');
const mongooseFieldEncryption = require('mongoose-field-encryption')
	.fieldEncryption;
const Schema = mongoose.Schema;

//Schema Model
const schema = new Schema({
	email: { type: String, unique: true },
	role: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	phone: { type: String },
	home: { type: String },
	work: { type: String },
	preferredNumber: { type: String },
	Address: { type: Object },
	city: { type: String },
	country: { type: String },
	state: { type: String },
	age: { type: String },
	sex: { type: String },
	dob: { type: String },
	active: { type: Boolean },
	wellnessReminder: { type: Boolean },
	appointmentReminderText: { type: Boolean },
	notify: { type: Boolean },
	race: { type: Array },
	ethnicity: { type: String },
	zip: { type: String },
	password: { type: String },
	passwordToken: { type: String },
	verified: { type: Boolean },
	passwordExpires: { type: Date },
	createdDate: { type: Date, default: Date.now },
	appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointments' }],
	cancelledAppointments: [
		{ type: Schema.Types.ObjectId, ref: 'Appointments' },
	],
	lastLogin: { type: Date, default: Date.now },
	bloodGroup: { type: String },
	customerProfile: { type: String },
	picture: { type: String },
	records: [{ type: Object }],
	//Below fields shows the latest medical info
	weight: {
		value: { type: String },
		practiseName: { type: String },
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},
	height: {
		value: { type: String },
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},
	heartRate: {
		value: { type: String },
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},
	bloodPressure: {
		value: { type: String },
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},

	temperature: {
		value: { type: String },
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},

	respiration: {
		value: { type: String },
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},
	oxygen: {
		value: { type: String },
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},
	bloodSugar:{
		value:{
			mg:{type:String},
			mmol:{type:String}
		},
		practise: { type: Schema.Types.ObjectId, ref: 'Practise' },
		practiseName: { type: String },
		modifiedBy: { type: String },
		date: { type: Date, default: Date.now() },
	},
	meta: { type: Schema.Types.ObjectId, ref: 'Usermeta' }, // All data which are not required on the dashboard
	referralId: { type: String, required: true },
	favourites: [{ type: Schema.Types.ObjectId, ref: 'Practise' }], //List of favourite doctors
	deviceToken: [
		{
			type: String,
		},
	],
	online: { type: Boolean, default: false },
	socket: { type: Schema.Types.Mixed, default: false },
	conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversations' }],
});

schema.plugin(mongooseFieldEncryption, {
	fields: [
		'email',
		'role',
		'firstName',
		'lastName',
		'phone',
		'home',
		'work',
		'preferredNumber',
		'address',
		'city',
		'country',
		'state',
		'sex',
		'age',
		'dob',
		'active',
		'wellnessReminder',
		'appointmentReminderText',
		'notify',
		'race',
		'ethinicity',
		'zip',
		'password',
		// "passwordtoken",
		'verified',
		// "passwordexpires",
		'createdDate',
		// 'appointments',
		'lastLogin',
		'bloodGroup',
		'customerProfile',
		'picture',
		'records',
		'weight',
		'height',
		'heartRate',
		'bloodPressure',
		'temperature',
		'respiration',
		'oxygen',
		// "referralId",
		// "meta",
		// "favourites",
	],
	secret: 'some secret key',
	saltGenerator: function(secret) {
		return '1234567890123456'; // should ideally use the secret to return a string of length 16
	},
});

//Exporting the schema
module.exports = mongoose.model('Patient', schema);
