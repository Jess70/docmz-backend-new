const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

// load up the user model
const User = require("../models/User.js");

module.exports = passport => {
  const private = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: process.env.SECRETKEY
  };
  passport.use(
    "jwt-private",
    new JwtStrategy(private, (jwt_payload, done) => {
      User.findOne({
        _id: jwt_payload._id,
        role: "admin"
      })
        .exec()
        .then(user => {
          return done(null, user);
        })
        .catch(error => {
          return done(error, false);
        });
    })
  );
};
