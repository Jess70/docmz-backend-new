var express = require("express");
var router = express.Router();

const Join = require("../database/models/Join");

module.exports = {
  async getJoinById(req, res) {
    try {
      const id = req.params.id;
      const db = await connectToDatabase();
      return Join.findById(id)
        .exec()
        .then(join => {
          if (!join)
            return res
              .status(401)
              .send({ success: false, message: "No join found" });
          else return res.status(201).send({ success: true, join });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async add(req, res) {
    try {
      const db = await connectToDatabase();
      return Join.create({
        join_form_title: req.body.join_form_title,
        join_form_button: req.body.join_form_button,
        join_form_desc: req.body.join_form_desc
      })
        .then(join => {
          res.status(201).send(join);
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async update(req, res) {
    try {
      const db = await connectToDatabase();
      return Join.findById(id)
        .exec()
        .then(join => {
          if (!join) {
            return res.status(404).send({
              message: "join not found"
            });
          }
          return join
            .updateOne({
              join_form_title: req.body.join_form_title || join.join_form_title,
              join_form_button:
                req.body.join_form_button || join.join_form_button,
              join_form_desc: req.body.join_form_desc || join.join_form_desc
            })
            .then(join => res.status(201).send(join))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
