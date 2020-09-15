const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectAdmin} = require('../modules/authentication-middleware');

// route to post new map to db
router.post('/add', rejectUnauthenticated, rejectAdmin, async (req, res) => {
    let map = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const firstQuery = `INSERT INTO "maps" ("name", "type", "image", "description")
        VALUES ($1, $2, $3, $4)
        RETURNING "id";`;
        const newMapResult = await client.query(firstQuery, [map.name, map.type, map.image, map.description]);
        const id = newMapResult.rows[0].id;
        const secondQuery = `INSERT INTO "map_heroes" ("hero_id", "map_id")
        VALUES ($1, $2);`;
        await client.query(secondQuery, [Number(map.hero_one), id]);
        await client.query(secondQuery, [Number(map.hero_two), id]);
        await client.query(secondQuery, [Number(map.hero_three), id]);
        await client.query('COMMIT');
        res.sendStatus(201)
    }catch(error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release()
    }
});

// route to get all map information from db
router.get('/:type', rejectUnauthenticated, (req, res) => {
    if(req.params.type === 'All'){
        let queryText = `SELECT * FROM "maps"
        ORDER BY "name" ASC;`;
        pool.query(queryText).then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
        })
    } else {
        let queryText = `SELECT * FROM "maps"
        WHERE "type" = $1
        ORDER By "name" ASC;`;
        pool.query(queryText, [req.params.type])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            res.sendStatus(500);
        })
    }
});

// route to get individual map info
router.get('/ind/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "maps"
    WHERE "id" =  $1;`;
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
});

router.get('/mapheroes/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT "heroes".id, "heroes".name, "heroes".role, "heroes".image FROM "map_heroes"
    JOIN "heroes" ON "heroes".id = "map_heroes".hero_id
    WHERE "map_id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows)
    }).catch(error => {
        res.sendStatus(500)
    })
})

module.exports = router;