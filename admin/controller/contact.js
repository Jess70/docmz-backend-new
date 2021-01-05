var express = require("express");
var router = express.Router();

const Contact = require("../database/models/Contact");

module.exports = {
  async getContactById(req, res) {
    try {
      const id = req.params.id;
      const db = await connectToDatabase();
      return Contact.findById(id)
        .exec()
        .then(contact => {
          if (!contact)
            return res
              .status(401)
              .send({ success: false, message: "No contact found" });
          else return res.status(201).send({ success: true, contact });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async add(req, res) {
    try {
      const db = await connectToDatabase();
      return Contact.create({
        contact_img: req.body.contact_img,
        contact_text1: req.body.contact_text1,
        contact_header: req.body.contact_header,
        contact_desc: req.body.contact_desc,
        contact_address: req.body.contact_address,
        contact_email: req.body.contact_email,
        contact_phone: req.body.contact_phone,
        contact_ask_header1: req.body.contact_ask_header1,
        contact_ask_header2: req.body.contact_ask_header2,
        contact_ask_desc: req.body.contact_ask_desc,
        contact_ask_button1: req.body.contact_ask_button1,
        contact_ask_button2: req.body.contact_ask_button2,
        contact_banner_img: req.body.contact_banner_img,
        contact_touch_header1: req.body.contact_touch_header1,
        contact_touch_header2: req.body.contact_touch_header2,
        contact_touch_desc: req.body.contact_touch_desc
      })
        .then(contact => {
          res.status(201).send(contact);
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async update(req, res) {
    try {
      const db = await connectToDatabase();
      return Contact.findById(id)
        .exec()
        .then(contact => {
          if (!contact) {
            return res.status(404).send({
              message: "contact not found"
            });
          }
          return contact
            .updateOne({
              contact_img: req.body.contact_img || contact.contact_img,
              contact_text1: req.body.contact_text1 || contact.contact_text1,
              contact_header: req.body.contact_header || contact.contact_header,
              contact_desc: req.body.contact_desc || contact.contact_desc,
              contact_address:
                req.body.contact_address || contact.contact_address,
              contact_email: req.body.contact_email || contact.contact_email,
              contact_phone: req.body.contact_phone || contact.contact_phone,
              contact_ask_header1:
                req.body.contact_ask_header1 || contact.contact_ask_header1,
              contact_ask_header2:
                req.body.contact_ask_header2 || contact.contact_ask_header2,
              contact_ask_desc:
                req.body.contact_ask_desc || contact.contact.contact_desc,
              contact_ask_button1:
                req.body.contact_ask_button1 || contact.contact_ask_button1,
              contact_ask_button2:
                req.body.contact_ask_button2 || contact.contact_ask_button1,
              contact_banner_img:
                req.body.contact_banner_img || contact.contact_banner_img,
              contact_touch_header1:
                req.body.contact_touch_header1 || contact.contact_touch_header1,
              contact_touch_header2:
                req.body.contact_touch_header2 || contact.contact_touch_header2,
              contact_touch_desc:
                req.body.contact_touch_desc || contact.contact_touch_desc
            })
            .then(contact => res.status(201).send(contact))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
