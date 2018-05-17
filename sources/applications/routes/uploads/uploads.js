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
const express    = require( '../../node_modules/express' )
const router     = express.Router( { mergeParams: true } )
const path       = require( 'path' )
const fs         = require( 'fs' )
const FilesToDatabase = require( '../../databases/converters/FilesToDatabase.js' )

const filesToDatabase = new FilesToDatabase()

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
    .post( '/', filesToDatabase.saveFilesInDatabase.bind(filesToDatabase) )

module.exports = router
