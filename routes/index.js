var express = require("express");
var router = express.Router();
const passport = require("passport");
const userController = require("../admin/controller").user;
const footerController = require("../admin/controller").footer;
const homeController = require("../admin/controller").home;
const headerController = require("../admin/controller").header;
const contactController = require("../admin/controller").contact;
const joinController = require("../admin/controller").join;
const howitworksController = require("../admin/controller").howitworks;
const loginController = require("../admin/controller").login;

require("../admin/database/config/passport")(passport);

const getToken = headers => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const private = passport.authenticate("jwt-private", { session: false });

// User Controller
router.post("/api/user/signin", userController.signin);
router.post("/api/user/signup", userController.signup);
router.get("/api/user/:id", private, userController.getUserById);
router.put("/api/user", private, userController.updateUserById);

// Footer Controller
router.post("/api/footer", private, footerController.add);
router.put("/api/footer", private, footerController.update);
router.get("/api/footer/:id", footerController.getFooterById);
router.get("/api/footer", footerController.getAll);
// Header Controller
router.post("/api/header", private, headerController.add);
router.put("/api/header", private, headerController.update);
router.get("/api/header/:id", headerController.getHeaderById);
router.get("/api/header", headerController.getAll);
// Home controller
router.post("/api/home", private, homeController.add);
router.put("/api/home", private, homeController.update);
router.get("/api/home/:id", homeController.getHomeById);

// Contact Controller
router.post("/api/contact", private, contactController.add);
router.put("/api/contact", private, contactController.update);
router.get("/api/contact/:id", contactController.getContactById);

// Login controller
router.post("/api/login", private, loginController.add);
router.put("/api/login", private, loginController.update);
router.get("/api/login/:id", loginController.getLoginById);

// Join controller
router.post("/api/join", private, joinController.add);
router.put("/api/join", private, joinController.update);
router.get("/api/join/:id", joinController.getJoinById);

// Howitworks controller
router.post("/api/howitworks", private, howitworksController.add);
router.put("/api/howitworks", private, howitworksController.update);
router.get("/api/howitworks/:id", howitworksController.getHowitworksById);

module.exports = router;
