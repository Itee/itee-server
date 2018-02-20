/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

//import * as Itee from 'itee-client'
//import * as Itee from '../node_modules/itee-client/sources/itee-client'
import * as Itee from './itee-client.es'
import React from 'react'
import ReactDOM from 'react-dom'

(() => {

    // Check if webgl is available
    const message = Itee.Detector.getWebGLErrorMessage()
    if ( message.innerText ) {
        alert( message.innerText )
        return
    }

    // Create App
    const appView = {
//        type:  Itee.TButton,
//        props: {
//            key:   'TButton_0',
//            label: 'MyAwesomeButton'
//        }
    }

    const appModel = {}

    const appContainer = document.querySelector( 'itee-application-root' )

    const app          = React.createElement( Itee.TBasicApplication, appModel, appView )

    ReactDOM.render( app, appContainer )

    //    // Create App
    //    // Retrieve parameters
    //    const appContainer  = document.getElementById( 'mainContainer' )
    //    const appParameters = Itee.extend( window.TConfigParameters || {}, window.TUrlParameters || {} )
    //    const appOnReady    = function () {}
    //
    //    const clientApp = new Client.TApplication( appContainer, appParameters, appOnReady )
    //
    //    window.addEventListener( 'resize', function () {
    //
    //        console.log( 'RESIZEEEEEEEEEEEEEE' )
    //
    //    } )

})()
