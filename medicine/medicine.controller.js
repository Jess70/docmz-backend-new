const db = require("../_helpers/db");
const { clearConfigCache } = require("prettier");
const Usermeta = db.Usermeta,
  Appointment = db.Appointment,
  Medicine = db.Medicine;

const addMedicine = (req, res) => {
  let { appointmentId, practiseId, metaId, medicines } = req.body;
  if (typeof medicines === "string") {
    medicines = JSON.parse(medicines);
  }
  const data = {
    appointment: appointmentId,
    practise: practiseId,
    medicines: medicines
  };
  let medicineData = new Medicine(data);
  medicineData.save().then(async result => {
    console.log(result);
    let d1 = Usermeta.findOneAndUpdate(
      { _id: metaId },
      { $push: { medicines: result._id } },
      { new: true }
    );
    let d2 = Appointment.findOneAndUpdate(
      { _id: appointmentId },
      { medicines: result._id },
      { new: true }
    );
    Promise.all([d1, d2])
      .then(result => {
        console.log(result);
        res.status(200).json({
          status: true,
          message: "Successfully added medicines"
        });
      })
      .catch(err => {
        res.status(500).json({
          status: false,
          message: "Something went wrong",
          err: err
        });
      });
  });
};

const addMedicineByPatient = async (req, res) => {
  try {
    let { metaId, medicines } = req.body;
    console.log(medicines, typeof medicines);
    if (typeof medicines == "string") {
      medicines = JSON.parse(medicines);
      console.log(medicines);
    }

    const data = {
      medicines: medicines
    };
    let medicineData = new Medicine(data);
    medicineData
      .save()
      .then(async result => {
        console.log(result);
        let d1 = await (await Usermeta.findOne({ _id: metaId })).populate(
          "medicines"
        );
        d1.medicines.push(result._id);
        d1.save(function(err) {
          if (err)
            return res.status(500).json({
              status: false,
              message: "Something went wrong",
              err: err
            });
          return res.status(200).json({
            status: true,
            message: "Successfully added medicines"
          });
        });
        console.log(d1);
      })
      .catch(err => {
        res.status(500).json({
          status: false,
          message: "Something went wrong",
          err: err
        });
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      err: error
    });
  }
};

const getMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const usermeta = await Usermeta.findOne({ _id: id });
    const medicines = await usermeta.medicines.map(async i => {
      const med = await Medicine.findOne({ _id: i });
      return med;
    });
    const medall = await Promise.all(medicines);
    res.status(200).json({
      status: true,
      data: medall,
      message: "Successfully fetch data"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      err: { error }
    });
  }
};
const deleteMedicine = async (req, res) => {
  try {
    const { id, medid } = req.body;
    const med = await Medicine.deleteOne({ _id: medid });
    const usermeta = await Usermeta.findOne({ userId: id });
    const index = await usermeta.medicines.indexOf(medid);
    if (index > -1) {
      usermeta.medicines.splice(index, 1);
    }
    console.log(usermeta, index);

    usermeta.save(function(err) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Something went wrong",
          err: { err }
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Successfully fetch data"
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      err: { error }
    });
  }
};

module.exports = {
  addMedicine,
  addMedicineByPatient,
  getMedicine,
  deleteMedicine
};
