var express = require("express");
var router = express.Router();

const Howitworks = require("../database/models/Howitworks.js");

module.exports = {
  async getHowitworksById(req, res) {
    try {
      const id = req.params.id;
      const db = await connectToDatabase();
      return Howitworks.findById(id)
        .exec()
        .then(howitworks => {
          if (!howitworks)
            return res
              .status(401)
              .send({ success: false, message: "No howitworks found" });
          else return res.status(201).send({ success: true, howitworks });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async add(req, res) {
    try {
      const db = await connectToDatabase();
      return Howitworks.create({
        banner_list: req.body.banner_list,
        side_list: req.body.side_list
      })
        .then(howitworks => {
          res.status(201).send(howitworks);
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async update(req, res) {
    try {
      const db = await connectToDatabase();
      return Howitworks.findById(id)
        .exec()
        .then(howitworks => {
          if (!howitworks) {
            return res.status(404).send({
              message: "howitworks not found"
            });
          }
          return howitworks
            .updateOne({
              banner_list: req.body.banner_list || howitworks.banner_list,
              side_list: req.body.side_list || howitworks.side_list
            })
            .then(howitworks => res.status(201).send(howitworks))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
