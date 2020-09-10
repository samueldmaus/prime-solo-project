const express = require('express');
const pool = require('../modules/pool');
const { query } = require('../modules/pool');
const router = express.Router();

// route to get all the hero information
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "heroes"
    ORDER BY "role" DESC;`;
    pool.query(queryText).then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
});

// route to get individual hero information
router.get('/:id', (req, res) => {
    let queryText = `SELECT * FROM "heroes"
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})

// route to post new hero to db
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
});

// route to update hero information on db
router.put('/', (req, res) => {
    let hero = req.body;
    let queryText = `UPDATE "heroes" SET "name" = $1, "role" = $2, "image" = $3, "ability_one" = $4, "ability_two" = $5, "ability_three" = $6,
    "ability_four" = $7, "ability_ult" = $8
    WHERE "id" = $9;`;
    pool.query(queryText, [hero.name, hero.role, hero.image, hero.ability_one, hero.ability_two, hero.ability_three, hero.ability_four, hero.ability_ult, hero.id])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500)
    })
})

// route to delete hero from db
router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "heroes"
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.sendStatus(200)
    }).catch(error => {
        res.sendStatus(500)
    })
})

module.exports = router;