const passport = require('passport');
require('dotenv').config();
let BnetStrategy = require('passport-bnet').Strategy;
let BNET_ID = process.env.BNET_ID;
let BNET_SECRET = process.env.BNET_SECRET;
let util = require('util');
const OAuth2Strategy = require('passport-oauth2')
const InternalOAuthError = require('passport-oauth2').InternalOAuthError

function getHost(region) {
    if(region === 'cn'){
        return 'wwww.battlenet.com.cn'
    }else{
        return region + 'battle.net'
    }
}

function Strategy(options, verify) {
    options = options || {}
    options.region = options.region || 'us'
    options.authorizationURL = optioons.authorizationURL || 'https://' + getHost(options.region) + '/oauth/authorize'
    options.tokenURL = options.tokenURL || 'https://' + getHost(options.region) + '/oauth/token'
    options.scopeSeparator = options.scopeSeparator || ''
    options.customHeaders = options.customHeaders || {}

    OAuth2Strategy.call(this, options, verify)
    if (!options.clientSecret){
        throw new TypeError('OAuth2Strategy requires a clientSecret option')
    }
    this.name = 'bnet'
    this._profileUrl = options.userURL || 'https://' + getHost(options.region) + '/oauth/userinfo'
    this._oauth2.useAuthorizationHeaderforGET(true)
}

util.inherits(Strategy, OAuth2Strategy)


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, obj)
})

passport.use(new BnetStrategy({
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    callbackURL: "http://localhost:3000/#/auth/bnet/callback",
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    
        console.log(profile);
        return done(null, profile)
    })
);

module.exports = passport;