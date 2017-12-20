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

const express        = require( 'express' )
const busBoy         = require( 'express-busboy' )
const webSocket      = require( 'express-ws' )
const fs             = require( 'fs' )
const morgan         = require( 'morgan' )
const errorHandler   = require( 'errorhandler' )
const bodyParser     = require( 'body-parser' )
const methodOverride = require( 'method-override' )
const resource       = require( 'express-resource' )
const favicon        = require( 'serve-favicon' )
const path           = require( 'path' )

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

    // //////////////////////////////
    // //////// EXTENSIONS //////////
    // //////////////////////////////
    busBoy.extend( app, config.bus_boy )
    webSocket( app )

    // ////////// APPLICATION CONFIG ////////////
    const env = config.env
    app.set( 'env', env )
    app.set( 'hostName', config[ env ].hostname )
    app.set( 'port', config[ env ].port )
    app.set( 'db uri', config[ env ].db_uri )
    app.set( 'views', config[ env ].views )
    app.set( 'view engine', config[ env ].view_engine )
    app.set( 'jsonp callback name', config[ env ].jsonp_callback_name )
    app.set( 'json replacer', config[ env ].jsonp_replacer )
    app.set( 'json spaces', config[ env ].jsonp_spaces );
    (config[ env ].trust_proxy) ? app.enable( 'trust proxy' ) : app.disabled( 'trust proxy' );
    (config[ env ].case_sensitive_routing) ? app.enable( 'case sensitive routing' ) : app.disabled( 'case sensitive routing' );
    (config[ env ].strict_routing) ? app.enable( 'strict routing' ) : app.disabled( 'strict routing' );
    (config[ env ].view_cache) ? app.enable( 'view cache' ) : app.disabled( 'view cache' );

    // ////////// CONNECT MIDDLEWARE //////////////
    const logFilePath = config[ env ].path_to_log

    // Create log folder if not exist
    const logFolder = path.dirname( logFilePath )
    if ( !fs.existsSync( logFolder ) ) {
        fs.mkdirSync( logFolder )
    }

    app.use( morgan( 'combined', {
        stream: fs.createWriteStream( logFilePath, { flags: 'a' } )
    } ) )

    app.use( errorHandler() )
    app.use( favicon( config[ env ].path_to_favicon ) )
    //    app.use( bodyParser.urlencoded( {
    //        extended: true,
    //        limit:    '5mb'
    //    } ) );
    //    app.use( bodyParser.json( { limit: '5mb' } ) );
    app.use( methodOverride( '_method' ) )

    // //// END OF APPLICATION //////
    return app

}
