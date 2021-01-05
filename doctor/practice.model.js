const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const practise = new Schema({
	enumerationType: { type: String },
	npi: { type: String, unique: true },
	last_updated_epoch: { type: String },
	created_epoch: { type: String },
	basic: {
		organization_name: { type: String },
		organizational_subpart: { type: String },
		enumeration_date: { type: String },
		last_updated: { type: String },
		status: { type: String },
		credential: { type: String },
		first_name: { type: String },
		last_name: { type: String },
		middle_name: { type: String },
		telephone_number: { type: String },
		title_or_position: { type: String },
		name_prefix: { type: String },
		name_suffix: { type: String },
		sole_proprietor: { type: String },
		gender: { type: String },
		name: { type: String },
	},
	other_names: { type: Object },
	address: [{ type: Schema.Types.ObjectId, ref: 'doctorAddress' }],
	taxonomies: [{ type: Schema.Types.ObjectId, ref: 'Taxonomies' }],
	practiceLocation: [{ type: Schema.Types.ObjectId, ref: 'doctorAddress' }],

	practise: { type: String },
	organizationName: { type: String },
	description: { type: String, default: 'NA' },
	identifiers: { type: Object },
	steps: { type: Array },
	email: { type: String },
	website: { type: String },
	taxId: { type: String },
	notes: { type: String },
	payToAddress: { type: String },
	payToAddress2: { type: String },
	payToCity: { type: String },
	payToState: { type: String },
	payToZipCode: { type: String },
	locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
	base_booking_parameters: {
		specialtyId: { type: Number },
		procedureId: { type: Number },
		insuranceCarrier: { type: Number },
		insurancePlan: { type: Number },
	},
	is_in_network: { type: Boolean, default: true },
	is_superDoc: { type: Boolean, default: false }, //Shows whether doctor is currently open for taking patients
	next_timeslot: { type: Object },
	location_ids: { type: Array },
	main_specialty_id: { type: Number },
	profile_url: { type: String },
	rating: { type: Object },
	isActive: { type: Boolean, default: true },
	isApproved: { type: Boolean, default: false },
	availability: { type: Array },
	appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointments' }],
	specialty: { type: String },
	specialtyName: { type: String },
	phone: { type: String },
	password: {
		type: String,
	},
	experience: { type: String },
	dob: { type: Date },
	picture: { type: Array },
	establishmentName: { type: String },
	city: { type: String },
	country: { type: String },
	state: { type: String },
	identityProof: { type: String },
	medicalProof: { type: String },
	createdOn: { type: Date, default: Date.now },
	availDate: { type: Date },
	savedCards: { type: Object },
	fee: { type: Number },
	customerProfile: { type: String },
	renewDate: { type: Date },
	passwordToken: { type: String },
	passwordExpires: { type: Date },
	profileStatus: { type: Boolean, default: true }, //shows whether doctor is active or not
	autoApprove: { type: Boolean }, //Auto approve appointments
	question: [{ type: Schema.Types.ObjectId, ref: 'question' }],
	appointmentsString: {
		type: String,
		default: `{"duration":"15","id":"","weekdaysArr":[{"days":["wednesday","thursday","friday"],"startTime":"02:30","endTime":"11:30","lunchStart":"06:30","lunchEnd":"07:30"},{"days":["monday","tuesday"],"startTime":"03:30","endTime":"12:30","lunchStart":"06:30","lunchEnd":"07:30"}]}`,
	}, //holds the payload by the doctor for the appointment in string format
	totalPatient: { type: String }, //Shows total number of patient viewed
	firstName: { type: String },
	lastName: { type: String },
	name: { type: String },
	gender: { type: String, enum: ['male', 'female'] },
	bio: { type: String },
	onBoarding: { type: Boolean, default: false },
	//Document of doctors
	document: {
		idProof: { type: Boolean, default: false },
		registrationProof: { type: Boolean, default: false },
		establishment: { type: Boolean, default: false },
	},
	idProof: { type: String },
	registrationProof: { type: String },
	establishment: { type: String },
	video: { type: String },

	referralId: { type: String },
	referrals: [{ type: Schema.Types.ObjectId, ref: 'Referral' }],
	latestAppointment: [{ type: Schema.Types.ObjectId, ref: 'Appointments' }],
	payment: { type: Boolean, default: true }, //whether doctor asks for payment or not
	isAssistant: { type: Boolean, default: false }, //denotes whether the account is assistent or not
	rights: [{ type: String }], // Array of rights that assistent have
	assistants: [{ type: Schema.Types.ObjectId, ref: 'Practise' }], // if doctor, list of all assistents
	parent: { type: Schema.Types.ObjectId, ref: 'Practise' },
	charity: { type: Boolean, default: false }, //if this key is true. Doctor will not be charging any consultation fee
	education: [
		{
			degree: { type: String },
			university: { type: String },
			year: { type: Number },
		},
	],
	registration: {
		regNo: { type: String },
		regCouncil: { type: String },
		regYear: { type: Number },
	},
	clinic: [{ type: Schema.Types.ObjectId, ref: 'clinics' }],
	meta: { type: Schema.Types.ObjectId, ref: 'Practisemeta' },
	block: { type: Boolean, default: false },
	deviceToken: [
		{
			type: String,
		},
	],
	online: { type: Boolean, default: false },
	socket: { type: Schema.Types.Mixed, default: false },
	conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversations' }],
});
practise.pre(
	'findOneAndUpdate',
	{ document: true, query: false },
	async function(next) {
		// if (isNumber(this.a) && isNumber(this.b)) this.sum = this.a + this.b;
		// next();
		const docToUpdate = await this.findOne(this.getQuery());
		if (!docToUpdate.onBoarding) {
			// console.log({1:docToUpdate.gender,
			//   2:docToUpdate.practiceLocation.length>=1,
			//   3:docToUpdate.specialty,
			//   4:docToUpdate.education.length>=1,
			//   5:docToUpdate.registration.regNo,
			//   6:docToUpdate.experience,
			//   7:docToUpdate.clinic.length>=1});
			if (
				docToUpdate.gender &&
				docToUpdate.practiceLocation.length >= 1 &&
				docToUpdate.specialty &&
				docToUpdate.education.length >= 1 &&
				docToUpdate.registration.regNo &&
				docToUpdate.experience &&
				docToUpdate.clinic.length >= 1
			) {
				docToUpdate.onBoarding = true;
				docToUpdate.save();
			}
		}
	},
);
module.exports = mongoose.model('Practise', practise);
