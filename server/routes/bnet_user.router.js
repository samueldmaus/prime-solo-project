const express = require('express');
const passport = require('passport');
const bnetStrategy = require('../strategies/bnet.strategy');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();
const cors = require('cors');


router.get('/', bnetStrategy.authenticate('bnet'));

// router.get('/', (req, res) => {
//   console.log('loggin in with bnet')
// });

router.get('/callback',
  bnetStrategy.authenticate('bnet', { failureRedirect: '/'}),
  function(req, res){
      res.redirect('/user')
  }
);


module.exports = router;