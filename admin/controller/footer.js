var express = require("express");
var router = express.Router();

const Footer = require("../database/models/Footer");

module.exports = {
  async getAll(req, res) {
    try {
      const db = await connectToDatabase();
      return Footer.find()
        .exec()
        .then(footer => {
          if (!footer)
            return res
              .status(401)
              .send({ success: false, message: "No footer found" });
          else return res.status(201).send({ success: true, footer });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async getFooterById(req, res) {
    try {
      const id = req.params.id;
      const db = await connectToDatabase();
      return Footer.findById(id)
        .exec()
        .then(footer => {
          if (!footer)
            return res
              .status(401)
              .send({ success: false, message: "No footer found" });
          else return res.status(201).send({ success: true, footer });
        });
    } catch (e) {
      return res.status(400).send(e);
    }
  },
  async add(req, res) {
    try {
      const db = await connectToDatabase();
      return Footer.deleteMany({})
        .exec()
        .then(footer => {
          return footer
            .create({
              logo_img: req.body.logo_img,
              company_desc: req.body.company_desc,
              company_address: req.body.company_address,
              company_email: req.body.company_email,
              company_number: req.body.company_number,
              company_copyright: req.body.company_copyright,
              app_desc: req.body.app_desc,
              app_title: req.body.app_title,
              appstore_logo: req.body.appstore_logo,
              playstore_logo: req.body.playstore_logo,
              company_emergency_call: req.body.company_emergency_call,
              company_emergency_email: req.body.company_emergency_email,
              site_links: req.body.site_links,
              city_text: req.body.city_text,
              specility_text: req.body.specility_text,
              insurance_text: req.body.insurance_text,
              city_list: req.body.city_list,
              insurance_list: req.body.insurance_text,
              specility_list: req.body.specility_text
            })
            .then(footer => {
              res.status(201).send(footer);
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
      return Footer.findById(id)
        .exec()
        .then(footer => {
          if (!footer) {
            return res.status(404).send({
              message: "footer not found"
            });
          }
          return footer
            .updateOne({
              logo_img: req.body.logo_img || footer.logo_img,
              company_desc: req.body.company_desc || footer.company_desc,
              company_address: req.body.company_address || footer.company_desc,
              company_email: req.body.company_email || footer.company_email,
              company_number: req.body.company_number || footer.company_number,
              company_copyright:
                req.body.company_copyright || footer.company_copyright,
              app_desc: req.body.app_desc || footer.app_desc,
              app_title: req.body.app_title || footer.app_title,
              appstore_logo: req.body.appstore_logo || footer.appstore_logo,
              playstore_logo: req.body.playstore_logo || footer.playstore_logo,
              company_emergency_call:
                req.body.company_emergency_call ||
                footer.company_emergency_call,
              company_emergency_email:
                req.body.company_emergency_email ||
                footer.company_emergency_email,
              site_links: req.body.site_links || footer.site_links,
              city_text: req.body.city_text || footer.city_text,
              specility_text: req.body.specility_text || footer.specility_text,
              insurance_text: req.body.insurance_text || footer.insurance_text,
              city_list: req.body.city_list || footer.city_list,
              insurance_list: req.body.insurance_text || footer.insurance_list,
              specility_list: req.body.specility_text || footer.specility_list
            })
            .then(footer => res.status(201).send(footer))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } catch (e) {
      return res.status(400).send(e);
    }
  }
};
