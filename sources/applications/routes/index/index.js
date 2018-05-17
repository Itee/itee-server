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
var router = require( 'express' ).Router( { mergeParams: true } )
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

        const pathToFile = path.join( __dirname, '../../../../resources/views/', 'index.pug' )
        const config     = request.query.config || 'undefined'
        const query      = request.query.query || null

        fs.stat(
            pathToFile,
            ( error, stats ) => {

                if ( error === null && stats.isFile() ) {

                    response
                        .render(
                            'index.pug',
                            {
                                _config_: config,
                                _query_:  query
                            }
                        )

                } else {

                    console.error( error )
                    next()

                }

            } )
    } )

module.exports = router
