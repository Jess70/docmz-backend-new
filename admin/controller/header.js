var express = require("express");
var router = express.Router();
const Header = require("../database/models/Header");

module.exports = {
  async getHeaderById(req, res) {
    try {
      const id = req.params.id;
      const db = await connectToDatabase();
      return Header.findById(id)
        .exec()
        .then(header => {
          if (!header)
            return res
              .status(401)
              .send({ success: false, message: "No header found" });
          else return res.status(201).send({ success: true, header });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async getAll(req, res) {
    try {
      const db = await connectToDatabase();
      return Header.find()
        .exec()
        .then(header => {
          if (!header)
            return res
              .status(401)
              .send({ success: false, message: "No header found" });
          else return res.status(201).send({ success: true, header });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async add(req, res) {
    try {
      const db = await connectToDatabase();
      return Header.deleteMany({})
        .exec()
        .then(header => {
          return Header.create({
            logo_img: req.body.logo_img,
            item_list: req.body.item_list
          })
            .then(header => {
              res.status(201).send(header);
            })
            .catch(error => res.status(400).send(error));
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async update(req, res) {
    try {
      const db = await connectToDatabase();
      return Header.findById(id)
        .exec()
        .then(header => {
          if (!header) {
            return res.status(404).send({
              message: "header not found"
            });
          }
          return header
            .updateOne({
              logo_img: req.body.logo_img || header.logo_img,
              item_list: req.body.item_list || header.item_list
            })
            .then(header => res.status(201).send(header))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
