/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/Views
 *
 * @description This module add routes for views.
 */

const router = require( 'express' ).Router( { mergeParams: true } )
var path    = require( 'path' )
var fs      = require( 'fs' )

function getURLParams ( query ) {

    var urlParams = {}

    for ( let key in query ) {

        if ( key === 'app' ) {
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
            const app     = request.query.app || 'undefined'
            const urlParams  = getURLParams( request.config )
            const extension  = view.split( "." )[ 1 ]
            const pathToFile = path.join( __dirname, '../../', '/resources/views/', view )

            console.log( view );
            console.log( app );
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
                                        app:       app,
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
