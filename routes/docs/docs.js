/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/Docs
 *
 * @description This module add routes for docs.
 */

/*
 * MODULES
 */
var express = require( '../../node_modules/express' )
var router  = express.Router( { mergeParams: true } )
var path    = require( 'path' )
var fs      = require( 'fs' )

/*
 * ROUTER
 */
router
    .get( '/:file(*)', function ( request, response, next ) {

        var pathToFile = path.join( __dirname, '../..', '/docs/', request.params.file )

        fs.stat(
            pathToFile,
            function ( error, stats ) {
                if ( error === null && stats.isFile() ) {
                    response.status( 200 ).sendFile( pathToFile )
                } else {
                    console.error( error )
                    next()
                }
            } )
    } )

module.exports = router
