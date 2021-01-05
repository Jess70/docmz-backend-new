const db = require("_helpers/db"),
  mongoose = require("mongoose");
const { Router } = require("express");
const { Review, practiseMeta } = require("../_helpers/db");
const { populate } = require("../otp/otp.model");

const addrecentpatient = async (req, res) => {
  try {
    const { id, patientid } = req.body;

    const practice = await Practise.findOne({ _id: id });

    if (practice.meta) {
      const meta = await practiseMeta.findOne({ _id: practice.meta });
      if (meta) {
        const index = meta.recentPatients
          .map(x => {
            return x.patient;
          })
          .indexOf(patientid);
        if (index >= 0) {
          meta.recentPatients.splice(index, 1);
        }
        meta.recentPatients.push({ patient: patientid, createdAt: Date.now() });
        meta.save(function(error) {
          if (error) console.log(error);
          return res
            .status(200)
            .json({ status: true, message: "patient added to list" });
        });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "doctor meta not found!" });
      }
    } else {
      return res
        .status(400)
        .json({ status: false, message: "doctor not Found!" });
    }
  } catch (error) {
    res.send(error);
  }
};

const recentpatients = async (req, res) => {
  try {
    const { id } = req.params;

    const meta = await practiseMeta
      .findOne({ practiseId: id })
      .populate({
        path: "recentPatients.patient",
        select: "-appointments -password ",
        populate: "meta"
      })
      .populate(
        "recentPatients.appointment",
        "bookedFor forWhom reasonForVisit patientInfo"
      );
    if (meta) {
      let appoint = meta.recentPatients.map(async (z, i) => {
        const appoint = await Appointment.findOne({ _id: z.appointment });
        console.log(appoint);
        if (appoint) {
          let { forWhom, bookedFor, reasonForVisit } = appoint;
          let ap = {
            createdAt: z.createdAt,
            _id: z._id,
            patient: z.patient,
            appointment: { forWhom, bookedFor, reasonForVisit }
            //appointment:appoint
          };
          return ap;
        }
      });
      const list = await Promise.all(appoint);
      return res.status(200).json({ status: true, data: list });
      // return res.status(200).json({ status: true, data: meta.recentPatients });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "doctor meta not found!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const addReview = async (req, res) => {
  try {
    const { doctorid, patientid, appointmentid, rating, note } = req.body;
    const review = new Review({ doctorid, patientid, rating, note });
    review.save(async function(error) {
      if (error)
        return res.status(400).json({
          status: false,
          message: "somthing went wrong!",
          error: { error }
        });
      const meta = await practiseMeta.findOne({ practiceId: doctorid });
      meta.review.push(rewiew._id);
      meta.save(function(error) {
        if (error)
          return res.status(400).json({
            status: false,
            message: "somthing went wrong!",
            error: { error }
          });
        return res.status(200).json({ status: true, message: "review added!" });
      });
    });
    //const meta = await practiseMeta.findOne({practiceId:doctorid});
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "somthing went wrong!",
      error: { error }
    });
  }
};
module.exports = {
  addrecentpatient,
  recentpatients
};
