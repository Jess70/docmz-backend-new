var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../database/models/User");

module.exports = {
  async getUserById(req, res) {
    try {
      const id = req.params.id;
      return User.findById(id)
        .exec()
        .then(user => {
          if (!user)
            return res
              .status(401)
              .send({ success: false, message: "No user found" });
          else return res.status(201).send({ success: true, user });
        });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async updateUserById(req, res) {
    try {
      const id = req.body.id;

      return User.findById(id)
        .exec()
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: "User not found"
            });
          }
          return user
            .updateOne({
              name: req.body.name || user.name,
              email: req.body.email || user.email,
              number: req.body.number || user.number,
              password: req.body.password || user.password,
              meta: req.body.meta || user.meta
            })
            .then(() => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async signin(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      return User.findOne({ email: email })
        .exec()
        .then(user => {
          if (!user)
            return res
              .status(401)
              .send({ success: false, message: "No user found" });
          if (bcrypt.compareSync(password, user.password)) {
            var token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              process.env.SECRETKEY,
              { expiresIn: 86400 * 30 }
            );
            jwt.verify(token, process.env.SECRETKEY, function(err, data) {});
            return res.json({
              success: true,
              id: user.id,
              token: "JWT " + token
            });
          } else {
            return res.status(401).send({
              success: false,
              message: "Authentication failed. Wrong password."
            });
          }
        });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async signup(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const username = email.split("@")[0];

      const user = new User({
        username: username,
        email: email,
        password: password,
        role: "admin"
      });

      return user.save().then(user => res.status(201).send(user));
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};
