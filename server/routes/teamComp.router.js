const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectAdmin} = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
    let hero = req.body;
    let queryText = `INSERT INTO "team_compositions" ("user_id", "name", "tank_one", "tank_two", "dps_one", "dps_two", "support_one", "support_two")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [req.user.id, hero.name, hero.tank_one_id, hero.tank_two_id, hero.dps_one_id, hero.dps_two_id, hero.support_one_id, hero.support_two_id])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500)
    })
})


module.exports = router;