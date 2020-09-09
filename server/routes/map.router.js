const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route to post new map to db
router.post('/add', (req, res) => {
    let map = req.body;
    let queryText = `INSERT INTO "maps" ("name", "type", "image", "description")
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [map.name, map.type, map.image, map.description])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500);
    })
})

module.exports = router;