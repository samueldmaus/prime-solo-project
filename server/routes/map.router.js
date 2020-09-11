const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectAdmin} = require('../modules/authentication-middleware');

// route to post new map to db
router.post('/add', rejectUnauthenticated, rejectAdmin, (req, res) => {
    let map = req.body;
    let queryText = `INSERT INTO "maps" ("name", "type", "image", "description")
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [map.name, map.type, map.image, map.description])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500);
    })
});

// route to get all map information from db
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "maps";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500);
    })
});

// route to get individual map info
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "maps"
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
});

// route to delete map from db
router.delete('/:id', rejectUnauthenticated, rejectAdmin, (req, res) => {
    let queryText = `DELETE FROM "maps"
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500);
    })
});

router.put('/:id', rejectUnauthenticated, rejectAdmin, (req, res) => {
    let map = req.body;
    let queryText = `UPDATE "maps"
    SET "name" = $1, "type" = $2, "image" = $3, "description" = $4
    WHERE "id" = $5;`;
    pool.query(queryText, [map.name, map.type, map.image, map.description, req.params.id])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500);
    })
})

module.exports = router;