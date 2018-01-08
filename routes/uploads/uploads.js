/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/Uploads
 *
 * @description This module add routes for upload user files on server.
 */

/*
 * MODULES
 */
var express    = require( '../../node_modules/express' )
var router     = express.Router( { mergeParams: true } )
var path       = require( 'path' )
var fs         = require( 'fs' )
var FileLoader = require( '../../modules/files/FileLoader.js' )

/*
 * ROUTER
 */
router
    .get( '/:file(*)', function ( request, response, next ) {

        var pathToFile = path.join( __dirname, '../..', '/views/uploads.html' )

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
    .post( '/', FileLoader.saveFileInDataBase )

module.exports = router
