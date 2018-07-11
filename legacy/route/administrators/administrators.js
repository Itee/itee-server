/**
 * Created by tvalcke on 11/06/2015.
 * This module allow to hold on /artists route.
 */
var express = require('../../node_modules/express'),
    router  = express.Router();


/**
 * Hold /artists route as '/',
 * and under children the same philosophies.
 */
router.route('/')
    .get(function( request, response, next ) {
        response.status(200).sendFile(__dirname + '/views/dashboard/dashboard.html').end();
    })
    .post(function( request, response, next ) {

        console.log("Post admins");
        next();

    })
    .put(function( request, response, next ) {
        console.log("Put admins");
        next();
    })
    .delete(function( request, response, next ) {
        console.log("Delete admins");
        next();
    });

router.route('/:id')
    .get(function( request, response, next ) {

        var params  = request.params,
            adminId = parseInt(params.id, 10);

        console.log('Get /admininitrators/:id');
        console.log('params:');
        console.log(params);
        console.log('adminId:');
        console.log(adminId);
        console.log(__dirname);

        response.status(200).sendFile('C:/Users/Tristan/Documents/Programmation/Web/Nodix/views/dashboard/dashboard.html');
        //response.status(200).sendFile(  __dirname + '../views/dashboard/dashboard.html' );
        //response.end();

        //next();
    })
    .post(function( request, response, next ) {
        console.log("Post admin ");
        next();
    })
    .put(function( request, response, next ) {
        console.log("Put admin");

        var params   = request.body,
            artistId = parseInt(request.params.id, 10);

        //connection.query('UPDATE test_acm SET first_name="'+params.first_name+'", last_name="'+params.last_name+'", age='+params.age+', sexe="'+params.sexe+'" WHERE id='+artistId+'', function(errorQuery, rows, fields) {
        //    if(!errorQuery) {
        //        response.send(rows)
        //    } else {
        //        console.error('Error while performing Query: ' + errorQuery);
        //        response.send({error: errorQuery});
        //    }
        //});

    })
    .delete(function( request, response, next ) {
        console.log("Delete admin");

        var params   = request.params,
            artistId = parseInt(params.id, 10);

        //connection.query('DELETE FROM test_acm WHERE id = '+artistId+'', function(errorQuery, rows, fields) {
        //    if(!errorQuery) {
        //        response.send(rows)
        //    } else {
        //        console.error('Error while performing Query: ' + errorQuery);
        //        response.send({error: errorQuery});
        //    }
        //});


    });

module.exports = router;
