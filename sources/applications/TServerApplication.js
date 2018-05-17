/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module TServerApplication
 *
 * @description This is the server application, that will in first of all handle user request,
 * and call the router
 *
 * @requires {@link module: [express]{@link https://github.com/expressjs/express}}
 * @requires {@link module: [express-busboy]{@link https://github.com/yahoo/express-busboy}}
 * @requires {@link module: [express-ws]{@link https://github.com/HenningM/express-ws}}
 * @requires {@link module: [fs]{@link https://nodejs.org/api/fs.html}}
 * @requires {@link module: [morgan]{@link https://github.com/expressjs/morgan}}
 * @requires {@link module: [errorhandler]{@link https://github.com/expressjs/errorhandler}}
 * @requires {@link module: [body-parser]{@link https://github.com/expressjs/body-parser}}
 * @requires {@link module: [method-override]{@link https://github.com/expressjs/method-override}}
 * @requires {@link module: [express-resource]{@link https://github.com/expressjs/express-resource}}
 * @requires {@link module: [serve-favicon]{@link https://github.com/expressjs/serve-favicon}}
 * @requires {@link module: [path]{@link https://nodejs.org/api/path.html}}
 *
 */

const fs           = require( 'fs' )
const path         = require( 'path' )
const express      = require( 'express' )
const busBoy       = require( 'express-busboy' )
const webSocket    = require( 'express-ws' )
const morgan       = require( 'morgan' )
const rfs          = require( 'rotating-file-stream' )
const errorHandler = require( 'errorhandler' )
const favicon      = require( 'serve-favicon' )

/**
 * Setup the web server application
 * @param app - The server application to extend (by default this is a newly created express app)
 * @param config - The config to apply to the application
 * @returns {*} - The extended application
 */
module.exports = function ( config ) {

    // //////////////////////////////
    // /////// APPLICATION //////////
    // //////////////////////////////

    let app = express()
    app.set( 'env', config.env )
    app.set( 'hostName', config.hostname )
    app.set( 'port', config.port )
    app.set( 'db uri', config.db_uri )
    app.set( 'views', config.views )
    app.set( 'view engine', config.view_engine )
    app.set( 'jsonp callback name', config.jsonp_callback_name )
    app.set( 'json replacer', config.jsonp_replacer )
    app.set( 'json spaces', config.jsonp_spaces )
    (config.trust_proxy) ? app.enable( 'trust proxy' ) : app.disabled( 'trust proxy' );
    (config.case_sensitive_routing) ? app.enable( 'case sensitive routing' ) : app.disabled( 'case sensitive routing' );
    (config.strict_routing) ? app.enable( 'strict routing' ) : app.disabled( 'strict routing' );
    (config.view_cache) ? app.enable( 'view cache' ) : app.disabled( 'view cache' );

    // ////////// CONNECT MIDDLEWARE //////////////
    const middlewareConfig = config.middlewares

    busBoy.extend( app, middlewareConfig.busBoy )

    webSocket( app )

    // create a rotating write stream
    const accessLogStream = rfs( middlewareConfig.morgan.fileName, {
        interval: middlewareConfig.morgan.interval, // rotate daily
        path:     (() => {

            const logFilePath  = middlewareConfig.morgan.directoryPath
            const logDirectory = path.dirname( logFilePath )

            // Ensure log directory exists
            fs.existsSync( logDirectory ) || fs.mkdirSync( logDirectory )

            return logDirectory

        })()
    } )
    app.use( morgan( 'combined', { stream: accessLogStream } ) )

    app.use( errorHandler() )
    app.use( favicon( middlewareConfig.favicon.path ) )

    // //// END OF APPLICATION //////
    return app

}
