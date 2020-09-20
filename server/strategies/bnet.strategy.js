const passport = require('passport');
require('dotenv').config();
const BnetStrategy = require('passport-bnet').Strategy;
const BATTLENET_ID = process.env.BNET_ID;
const BATTLENET_SECRET = process.env.BNET_SECRET;
const util = require('util');
const pool = require('../modules/pool');
const OAuth2Strategy = require('passport-oauth2')
const InternalOAuthError = require('passport-oauth2').InternalOAuthError

passport.serializeUser((user, done) => {
    console.log('SERIALIZE')
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('DESERIALIZE')
    done(null, obj)
})

module.exports= (passport.use(new BnetStrategy({
    clientID: BATTLENET_ID ,
    clientSecret: BATTLENET_SECRET,
    callbackURL: "https://localhost:3000/auth/bnet/callback",
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    
        console.log(JSON.stringify(profile))
        return done(null, profile)
    })
));

// function getHost(region) {
//     console.log("REGION")
//     if(region === 'cn'){
//         return 'wwww.battlenet.com.cn'
//     }else{
//         return region + '.battle.net'
//     }
// };


// function Strategy(options, verify) {
//     console.log('OPTIONS!!!!', JSON.stringify(options))
//     options = options || {}
//     options.region = options.region || 'us'
//     options.authorizationURL = options.authorizationURL || 'https://' + getHost(options.region) + '/oauth/authorize'
//     options.tokenURL = options.tokenURL || 'https://' + getHost(options.region) + '/oauth/token'
//     options.scopeSeparator = options.scopeSeparator || ''
//     options.customHeaders = options.customHeaders || {}

//     OAuth2Strategy.call(this, options, verify)
//     if (!options.clientSecret){
//         throw new TypeError('OAuth2Strategy requires a clientSecret option')
//     }
//     this.name = 'bnet'
//     this._profileUrl = options.userURL || 'https://' + getHost(options.region) + '/oauth/userinfo'
//     this._oauth2.useAuthorizationHeaderforGET(true)
// }

// util.inherits(Strategy, OAuth2Strategy)

// Strategy.prototype.userProfile = function (accessToken, done) {
//     this._oauth2.get(this._profileUrl, accessToken, function(err, body, res) {
//         let json
//         if(err) {
//             return done(new InternalOAuthError('failed to fetch the user id', error))
//         }
//         try {
//             json = JSON.parse(body)
//         }catch (ex) {
//             return done(new Error('failed to par the user id'))
//         }

//         let profile = json
//         profile.provider = 'bnet'
//         profile.token = accessToken

//         return done(null, profile)
//     })
// }


