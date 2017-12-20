/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

import * as Client from '../node_modules/itee-client/sources/itee-client'

(() => {

    // Check if webgl is available
    const message = Client.WebGLDetector.getWebGLErrorMessage()
    if ( message.innerText ) {
        alert( message.innerText )
        return
    }

    // Create App
    // Retrieve parameters
    const appContainer  = document.getElementById( 'mainContainer' )
    const appParameters = TClientAppParameters || {}
    const appOnReady    = function appOnReady() {}

    const clientApp = new Client.TApplication( appContainer, appParameters, appOnReady )

    window.addEventListener( 'resize', function () {

        console.log( 'RESIZEEEEEEEEEEEEEE' )

    } )

})()
