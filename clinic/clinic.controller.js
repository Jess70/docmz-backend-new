const db = require("../_helpers/db");
const Clinic = db.Clinic;
const Practise = db.Practise;

const addClinic = async (req, res) => {
  try {
    const {
      doctor,
      ClinicType,
      ClinicName,
      City,
      Locality,
      StreetAddress,
      MapLocation,
      ClinicNumber,
      Fees
    } = req.body;
    const newClinic = new Clinic({
      doctor,
      ClinicType,
      ClinicName,
      City,
      Locality,
      StreetAddress,
      MapLocation,
      ClinicNumber,
      Fees
    });
    newClinic.save(async function(err) {
      if (err)
        return res
          .status(500)
          .json({ status: false, err: err, message: "something went wrong!" });
      const prac = await Practise.findOne({ _id: doctor });
      prac.clinic.push(newClinic._id);
      prac.save(function() {
        if (err)
          return res
            .status(500)
            .json({
              status: false,
              err: err,
              message: "something went wrong!"
            });
      });
      return res
        .status(200)
        .json({ status: true, data: newClinic, message: "New clinic Added" });
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, err: err, message: "something went wrong!" });
  }
};

const editClinic = async (req, res) => {
  try {
    const {
      id,
      doctor,
      ClinicType,
      ClinicName,
      City,
      Locality,
      StreetAddress,
      MapLocation,
      ClinicNumber,
      Fees
    } = req.body;
    const updateClinic = await Clinic.findOneAndUpdate(
      { _id: id, doctor },
      {
        ClinicType,
        ClinicName,
        City,
        Locality,
        StreetAddress,
        MapLocation,
        ClinicNumber,
        Fees
      },
      { new: true }
    );
    res.status(200).json({
      status: true,
      data: updateClinic,
      message: "Update clinic data"
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, err: err, message: "something went wrong!" });
  }
};

const getAllClinic = async (req, res) => {
  try {
    const clinics = await Clinic.find().populate("doctor");
    return res
      .status(200)
      .json({ status: true, data: clinics, message: "fetch all clinic list" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, err: error, message: "something went wrong!" });
  }
};

const getClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic = await Clinic.findOne({ _id: id }).populate("doctor");
    return res
      .status(200)
      .json({ status: true, data: clinic, message: "fetch  clinic" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, err: error, message: "something went wrong!" });
  }
};
const getClinicByDoc = async (req, res) => {
  try {
    const { doctor } = req.params;
    const clinics = await Clinic.find({ doctor }).populate("doctor");
    return res
      .status(200)
      .json({ status: true, data: clinics, message: "fetch  clinic" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, err: error, message: "something went wrong!" });
  }
};
module.exports = {
  addClinic,
  editClinic,
  getAllClinic,
  getClinic,
  getClinicByDoc
};
