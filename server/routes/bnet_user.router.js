const express = require('express');
const passport = require('passport');
const bnetStrategy = require('../strategies/bnet.strategy');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', bnetStrategy.authenticate('bnet'));

router.get('/auth/bnet/callback',
  bnetStrategy.authenticate('bnet', { failureRedirect: '/'}),
  function(req, res){
      res.redirect('/users')
  }
);


module.exports = router;