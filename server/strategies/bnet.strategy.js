const passport = require('passport');
const pool = require('../modules/pool');
let BnetStrategy = require('passport-bnet').Strategy;
let BNET_ID = process.env.BNET_ID;
let BNET_SECRET = process.env.BNET_SECRET;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: "http://localhost:3000/#",
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile)
}));

module.exports = passport;