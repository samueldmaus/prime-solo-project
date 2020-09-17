const express = require('express');
const passport = require('passport');
const bnetStrategy = require('../strategies/bnet.strategy');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/auth/bnet', passport.authenticate('bnet'));

router.get('http://localhost:3000/#',
  passport.authenticate('bnet', { failureRedirect: '/'}),
  function(req, res){
      res.redirect('/')
  }
);

module.exports = router;