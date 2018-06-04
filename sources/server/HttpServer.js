/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/Views
 *
 * @description This module allow to catch and log every server request, and events.
 * This is here were the server start listening on configured port.
 *
 * @param app - The application that will listen
 * @see module:Application
 *
 * @param config - The server configuration (like port or ip to use)
 * @see external:The configuration file
 *
 */

/**
 * @external The http nodejs module
 */
var http = require( 'http' )

/**
 * Handle timeout event
 * @param data
 */
function onTimeout ( data ) {

    //  console.log( "Server event timeout !" );
    //  console.dir( data );
    //  console.log('\n');

}

/**
 * Handle request event
 * @param request - The user request
 * @param response - The server response
 */
function onRequest ( request, response ) {

    //  console.log("Server event request !");
    //  console.log(request.url);
    //  console.log(request.query);
    //  console.log(request.route);
    //
    //  console.log(request);
    //  console.log('\n');

}

/**
 * Handle connection event
 * @param socket
 */
function onConnection ( socket ) {

    //  console.log("Server event connection !");
    //  console.dir( socket );
    //  console.log('\n');

}

/**
 * Handle close event
 */
function onClose () {

    //  console.log("Server event close !");
    //  console.log('\n');

}

/**
 * Handle check continue event
 * @param request
 * @param response
 */
function onCheckContinue ( request, response ) {

    //  console.log("Server event checkContinue !");
    //  console.log("Request : "  + request);
    //  console.log("Response :"  + response);
    //  console.log('\n');

}

/**
 * Handle connect event
 * @param request
 * @param socket
 * @param head
 */
function onConnect ( request, socket, head ) {

    //  console.log("Server event connect !");
    //  console.log("Request : "  + request);
    //  console.log("Socket : " + socket);
    //  console.log("Head : " + head);
    //  console.log('\n');

}

/**
 * Handle upgrade event
 * @param request
 * @param socket
 * @param head
 */
function onUpgrade ( request, socket, head ) {

    //  console.log("Server event upgrade !");
    //  console.log("Request : "  + request);
    //  console.log("Socket : " + socket);
    //  console.log("Head : " + head);
    //  console.log('\n');

}

/**
 * Handle client error event
 * @param exception
 * @param socket
 */
function onClientError ( exception, socket ) {

    //  console.log("Server event clientError !");
    //  console.log("Exception : "  + exception);
    //  console.log("Socket : " + socket);
    //  console.log('\n');

}

/**
 * Will start listening on app.hostname under app.port, and display a message when up
 */
//function startListening() {
//  console.log('Server start listening on : ' + app.get('hostName') + ':' + app.get('port') + ' at ' + new Date() + ' on ' + app.get('env') + ' environment.')
//  console.timeEnd('Server launch time')
//  console.log('\n')
//}

module.exports = function initServer ( app, config ) {

    var server             = http.createServer( app )
    server.maxHeadersCount = config.max_headers_count
    server.timeout         = config.timeout;
    server
        .on( 'request', onRequest )
        .on( 'connection', onConnection )
        .on( 'close', onClose )
        .on( 'timeout', onTimeout )
        .on( 'checkContinue', onCheckContinue )
        .on( 'connect', onConnect )
        .on( 'upgrade', onUpgrade )
        .on( 'clientError', onClientError )
        .listen( app.get( 'port' ), app.get( 'hostName' ), function startListening () {
            console.log( 'Server start listening on : ' + app.get( 'hostName' ) + ':' + app.get( 'port' ) + ' at ' + new Date() + ' on ' + app.get( 'env' ) + ' environment.' )
            console.timeEnd( 'Server launch time' )
            console.log( '\n' )
        } )

    return server

}
