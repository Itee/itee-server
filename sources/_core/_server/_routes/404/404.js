/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/404
 *
 * @description This module add routes for 404, returning (by default) the 404.html view to the end user
 */

/**
 * @external The express router module
 */
const path = require( 'path' )
const fs   = require( 'fs' )
const router = require( 'express' ).Router( { mergeParams: true } )

router
    .get( '', function ( request, response, next ) {

        const pathToFile = path.join( __dirname, '../../../../../', '/resources/views/', '404.html' )

        fs.stat(
            pathToFile,
            function ( error, stats ) {
                if ( error === null && stats.isFile() ) {
                    response.status( 404 ).sendFile( pathToFile )
                } else {
                    console.error( error )
                    next()
                }
            } )

    } )

module.exports = router
