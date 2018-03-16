/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

//import * as Itee from 'itee-client'
import * as Itee from './itee-client.es'

(() => {

    // Check if webgl is available
    const message = Itee.Detector.getWebGLErrorMessage()
    if ( message.innerText ) {
        alert( message.innerText )
        return
    }

    // Create App
    const appParameters = Itee.extend( window.TConfigParameters || {}, window.TUrlParameters || {} )

    Itee.TApplicationFactory.createApplication( appParameters )


//const environment  = Itee.analyseEnvironment()
//const rawMaterial  = Itee.getRawMaterial( environment )
//const reactor      = Itee.createReactor( rawMaterial.fuel )
//const fuselage     = Itee.createFuselage( rawMaterial.alloy )
//const flyingSaucer = Itee.createFlyingSaucer( reactor, fuselage )
//
//flyingSaucer.launch()



})()
