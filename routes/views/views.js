/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/Views
 *
 * @description This module add routes for views.
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

module.exports = function ( env ) {

    /*
     * MODULES
     */

    const _env = env

    /*
     * ROUTER
     */
    router
        .get( '/:view(*)', ( request, response, next ) => {

            const view       = request.params.view
            const config     = request.query.config || 'undefined'
            const urlParams  = getURLParams( request.query )
            const extension  = view.split( "." )[ 1 ]
            const pathToFile = path.join( __dirname, '../..', '/views/', view )

            console.log( view );
            console.log( config );
            console.log( urlParams );
            console.log( extension );
            console.log( pathToFile );

            fs.stat(
                pathToFile,
                ( error, stats ) => {
                    if ( error === null && stats.isFile() ) {

                        if ( extension === "pug" ) {
                            response
                                .render(
                                    view,
                                    {
                                        env:       _env,
                                        config:    config,
                                        urlParams: urlParams
                                    }
                                )
                        } else {
                            response
                                .status( 200 )
                                .sendFile( pathToFile )
                        }

                    } else {
                        console.error( error )
                        next()
                    }
                } )
        } )

    return router

}
//module.exports = router
