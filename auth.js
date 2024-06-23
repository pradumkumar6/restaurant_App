const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // It is also known as username password strategy
const Person = require("./models/person");
// Verification function
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      // Authentication Logic
      // console.log("Received credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect Username." });
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password." });
      }
    } catch (error) {
      return done(error);
    }
  })
);
module.exports = passport;
