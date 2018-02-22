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
    const application = Itee.TApplicationFactory.createApplication( appParameters )

})()
