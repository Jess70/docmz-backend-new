var express = require("express");
var router = express.Router();

const Login = require("../database/models/Login");

module.exports = {
  async getLoginById(req, res) {
    try {
      const id = req.params.id;
      return Login.findById(id)
        .exec()
        .then(login => {
          if (!login)
            return res
              .status(401)
              .send({ success: false, message: "No login found" });
          else return res.status(201).send({ success: true, login });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async add(req, res) {
    try {
      return Login.create({
        login_banner_img: req.body.login_banner_img,
        login_form_title: req.body.login_form_title,
        login_form_button: req.body.login_form_button,
        login_form_register_text: req.body.login_form_register_text,
        login_form_register_button: req.body.login_form_register_button
      })
        .then(login => {
          res.status(201).send(login);
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async update(req, res) {
    try {
      return Login.findById(id)
        .exec()
        .then(login => {
          if (!login) {
            return res.status(404).send({
              message: "login not found"
            });
          }
          return login
            .updateOne({
              login_banner_img:
                req.body.login_banner_img || login.login_banner_img,
              login_form_title:
                req.body.login_form_title || login.login_form_title,
              login_form_button:
                req.body.login_form_button || login.login_form_button,
              login_form_register_text:
                req.body.login_form_register_text ||
                login.login_form_register_text,
              login_form_register_button:
                req.body.login_form_register_button ||
                login.login_form_register_button
            })
            .then(login => res.status(201).send(login))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
