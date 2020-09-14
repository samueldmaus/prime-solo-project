const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectAdmin} = require('../modules/authentication-middleware');

// route to add map to user favorites
router.put('/:mapId/:userId', rejectUnauthenticated, (req, res) => {
    let queryText = `INSERT INTO "map_favorites" ("user_id", "map_id")
    VALUES ($1, $2);`;
    pool.query(queryText, [req.params.userId, req.params.mapId])
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500)
    })
});

// route to get user map favorites
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT "maps".id, "maps".name, "maps".type, "maps".image, "maps".description FROM "maps"
    JOIN "map_favorites" ON "maps".id = "map_favorites".map_id
    JOIN "user" on "user".id = "map_favorites".user_id
    WHERE "map_favorites".user_id = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
});

module.exports = router;