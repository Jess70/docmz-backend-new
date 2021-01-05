var express = require("express");
var router = express.Router();

const Home = require("../database/models/Home");

module.exports = {
  async getHomeById(req, res) {
    try {
      const id = req.params.id;
      const db = await connectToDatabase();
      return Home.findById(id)
        .exec()
        .then(home => {
          if (!home)
            return res
              .status(401)
              .send({ success: false, message: "No home found" });
          else return res.status(201).send({ success: true, home });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async add(req, res) {
    try {
      const db = await connectToDatabase();
      return Home.create({
        banner_back: req.body.banner_back,
        banner_img: req.body.banner_img,
        banner_text1: req.body.banner_text1,
        banner_text2: req.body.banner_text2,
        banner_text3: req.body.banner_text3,
        banner_button: req.banner_button,
        appointment_text: req.body.appointment_text,
        howitworks_title_text: req.body.howitworks_title_text,
        howitworks_header_text: req.body.howitworks_header_text,
        howitworks_desc_text: req.body.howitworks_desc_text,
        howitworks_meta: req.body.howitworks_meta,
        specialities_text1: req.body.specialities_text1,
        specialities_text2: req.body.specialities_text1,
        specialities_meta: req.body.specialities_meta
      })
        .then(home => {
          res.status(201).send(home);
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async update(req, res) {
    try {
      const db = await connectToDatabase();
      return Home.findById(id)
        .exec()
        .then(home => {
          if (!home) {
            return res.status(404).send({
              message: "home not found"
            });
          }
          return home
            .updateOne({
              banner_back: req.body.banner_back || home.banner_back,
              banner_img: req.body.banner_img || home.banner_img,
              banner_text1: req.body.banner_text1 || home.banner_text1,
              banner_text2: req.body.banner_text2 || home.banner_text2,
              banner_text3: req.body.banner_text3 || home.banner_text3,
              banner_button: req.banner_button || home.banner_button,
              appointment_text:
                req.body.appointment_text || home.appointment_text,
              howitworks_title_text:
                req.body.howitworks_title_text || home.howitworks_title_text,
              howitworks_header_text:
                req.body.howitworks_header_text || home.howitworks_header_text,
              howitworks_desc_text:
                req.body.howitworks_desc_text || home.howitworks_desc_text,
              howitworks_meta: req.body.howitworks_meta || home.howitworks_meta,
              specialities_text1:
                req.body.specialities_text1 || home.specialities_text1,
              specialities_text2:
                req.body.specialities_text1 || home.specialities_text2,
              specialities_meta:
                req.body.specialities_meta || home.specialities_meta
            })
            .then(home => res.status(201).send(home))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
