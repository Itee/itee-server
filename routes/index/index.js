/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/Index
 *
 * @description This module add routes for index.
 */

/*
 * MODULES
 */
var express = require( '../../node_modules/express' )
var router  = express.Router( { mergeParams: true } )
var path    = require( 'path' )
var fs      = require( 'fs' )

function getURLParams ( query ) {

    var urlParams = {}

    for ( let key in query ) {

        if ( key === 'config' ) {
            continue
        }

        urlParams[ key ] = query[ key ]

    }

    return urlParams

}

/*
 * ROUTER
 */
router
    .get( '', ( request, response, next ) => {

        const pathToFile = path.join( __dirname, '../..', '/views/index.pug' )
        const config     = request.query.config || 'undefined'
        const urlParams  = getURLParams( request.query )

        fs.stat(
            pathToFile,
            ( error, stats ) => {

                if ( error === null && stats.isFile() ) {

                    response
                        .render(
                            'index.pug',
                            {
                                config:    config,
                                urlParams: urlParams
                            }
                        )

                } else {

                    console.error( error )
                    next()

                }

            } )
    } )

module.exports = router
