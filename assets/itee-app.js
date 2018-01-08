/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

import * as Client from '../node_modules/itee-client/sources/itee-client'

(() => {

    function isObject ( item ) {
        return (item && typeof item === 'object' && !Array.isArray( item ));
    }

    function mergeDeep ( target, source ) {

        var output = Object.assign( {}, target )

        if ( isObject( target ) && isObject( source ) ) {

            var keys = Object.keys( source )

            for ( var i = 0, n = keys.length ; i < n ; ++i ) {

                var key = keys[ i ]

                if ( isObject( source[ key ] ) ) {

                    if ( !(key in target) ) {
                        Object.assign( output, { [key]: source[ key ] } )
                    } else {
                        output[ key ] = mergeDeep( target[ key ], source[ key ] )
                    }

                } else {

                    Object.assign( output, { [key]: source[ key ] } )

                }
            }
        }
        return output;
    }

    // Check if webgl is available
    const message = Client.WebGLDetector.getWebGLErrorMessage()
    if ( message.innerText ) {
        alert( message.innerText )
        return
    }

    // Create App
    // Retrieve parameters
    const appContainer  = document.getElementById( 'mainContainer' )
    const appParameters = mergeDeep( window.TConfigParameters || {}, window.TUrlParameters || {} )
    const appOnReady    = function () {}

    const clientApp = new Client.TApplication( appContainer, appParameters, appOnReady )

    window.addEventListener( 'resize', function () {

        console.log( 'RESIZEEEEEEEEEEEEEE' )

    } )

})()
