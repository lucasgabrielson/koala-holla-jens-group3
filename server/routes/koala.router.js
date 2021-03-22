const express = require('express');
const koalaRouter = express.Router();
// DB CONNECTION
const pool = require( '../modules/pool');


// GET
koalaRouter.get( '/', ( req, res ) => {
    console.log( 'koala.router GET' );
    let queryText = `SELECT * FROM "items" ORDER BY "id" ASC`;
    pool.query( queryText ).then( ( results ) =>{
        console.log( results.rows );
        res.send( results.rows );
    }).catch( ( err ) =>{
        console.log( err );
        res.sendStatus( 500 ); 
    })
})

// POST
koalaRouter.post('/', (req, res) => {
    console.log( 'koala.router POST', req.body );
    let queryText = `INSERT INTO "items" (name, age, gender, ready_to_transfer, notes) VALUES ($1, $2, $3, $4, $5);`
    pool.query(queryText, [req.body.name, req.body.age, req.body.gender, req.body.ready_to_transfer, req.body.notes]).then((results) => {
        res.sendStatus(200);

    }).catch ((err) => {
        console.log( error)
        res.sendStatus (500)
    })
})

// PUT
koalaRouter.put('/:id:transfer', ( req, res ) => {
    console.log('koala.route PUT', req.params);
    let queryText = '';
    console.log( req.params.transfer );
    if( req.params.transfer === 'true' ) {
        queryText = `UPDATE "items" SET "ready_to_transfer" = false WHERE "id" = $1`;
    }
    else {
        queryText = `UPDATE "items" SET "ready_to_transfer" = true WHERE "id" = $1`;
    }
    pool.query(queryText, [req.params.id]).then( ( results) => {
        res.sendStatus(200);
    }).catch( (err) => {
        res.sendStatus (500);
    });
});



// DELETE
koalaRouter.delete( '/:id', ( req, res ) => {
    console.log( 'koala.router DELETE', req.params);
    let queryText = `DELETE FROM "items" WHERE "id" = $1`;
    pool.query( queryText, [req.params.id]).then( ( results ) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    })
    
});
module.exports = koalaRouter;