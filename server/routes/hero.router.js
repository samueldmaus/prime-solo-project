const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "heroes";`;
    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})
router.post('/add', (req, res) => {
    let hero = req.body;
    let queryText = `INSERT INTO "heroes" ("name", "role", "image", "ability_one", "ability_two", "ability_three", "ability_four", "ability_ult")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [hero.name, hero.role, hero.image, hero.ability_one, hero.ability_two, hero.ability_three, hero.ability_four, hero.ability_ult])
    .then(result => {
        res.sendStatus(201)
    }).catch(error => {
        res.sendStatus(500)
    })
})

module.exports = router;