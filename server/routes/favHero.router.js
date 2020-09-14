const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectAdmin} = require('../modules/authentication-middleware');

// route for favoriting a hero
router.put('/:heroId/:userId', rejectUnauthenticated, (req, res) => {
    let queryText = `INSERT INTO "hero_favorites" ("user_id", "hero_id")
    VALUES ($1, $2);`;
    pool.query(queryText, [req.params.userId, req.params.heroId])
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500);
    })
});

// route to get user's favorite heroes
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT "heroes".id, "heroes".name, "heroes".role, "heroes".image, "heroes".ability_one, "heroes".ability_two, 
    "heroes".ability_three, "heroes".ability_four, "heroes".ability_ult FROM "heroes"
    JOIN "hero_favorites" ON "heroes".id = "hero_favorites".hero_id
    JOIN "user" ON "user".id = "hero_favorites".user_id
    WHERE "hero_favorites".user_id = $1
    ORDER BY "heroes".role DESC;`;
    pool.query(queryText, [req.user.id])
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500)
    })
});

module.exports = router;