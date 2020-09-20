const express = require('express');
const pool = require('../modules/pool');
const { query } = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectAdmin} = require('../modules/authentication-middleware');

// route to get all the hero information or get info for hero by selected role
router.get('/:role', rejectUnauthenticated, (req, res) => {
    if(req.params.role === 'All'){
        let queryText = `SELECT * FROM "heroes"
        ORDER BY "role" DESC, "name" ASC;`;
        pool.query(queryText).then(result => {
            res.send(result.rows)
        }).catch(error => {
            res.sendStatus(500)
        })
    } else{
        let queryText = `SELECT * FROM "heroes"
        WHERE "role" = $1
        ORDER By "name" ASC;`;
        pool.query(queryText, [req.params.role])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
        })
    }
});

// route to get individual hero information
router.get('/ind/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "heroes"
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
});

//route to get heroes information on search input
router.get('/search/:name', rejectUnauthenticated, (req, res) => {
    let search = `%${req.params.name}%`
    let queryText = `SELECT * FROM "heroes"
    WHERE "name" ILIKE $1
    ORDER BY "role" DESC;`;
    pool.query(queryText, [search])
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})

// route to post new hero to db
router.post('/add', rejectUnauthenticated, rejectAdmin, (req, res) => {
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
router.put('/:id', rejectUnauthenticated, rejectAdmin, (req, res) => {
    let hero = req.body;
    let queryText = `UPDATE "heroes" SET "name" = $1, "role" = $2, "image" = $3, "ability_one" = $4, "ability_two" = $5, "ability_three" = $6,
    "ability_four" = $7, "ability_ult" = $8
    WHERE "id" = $9;`;
    pool.query(queryText, [hero.name, hero.role, hero.image, hero.ability_one, hero.ability_two, hero.ability_three, hero.ability_four, hero.ability_ult, req.params.id])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500)
    })
})

// route to delete hero from db
router.delete('/:id', rejectUnauthenticated, rejectAdmin, (req, res) => {
    let queryText = `DELETE FROM "heroes"
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.sendStatus(200)
    }).catch(error => {
        res.sendStatus(500)
    })
});



module.exports = router;