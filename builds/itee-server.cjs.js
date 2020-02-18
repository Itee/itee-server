console.log('Itee.Server v6.2.0 - CommonJs')
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var express = _interopDefault(require('express'));
var http = _interopDefault(require('http'));
var https = _interopDefault(require('https'));
var iteeValidators = require('itee-validators');
var path = _interopDefault(require('path'));

/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

class TBackendManager {

    constructor ( parameters ) {

        this.rootPath     = parameters.rootPath;
        this.applications = express();
        this.router       = express.Router;
        this.databases    = new Map();
        this.servers      = new Map();

        this._initApplications( parameters.applications );
        this._initDatabases( parameters.databases );
        this._initServers( parameters.servers );

    }

    get rootPath () {

        return this._rootPath

    }

    set rootPath ( value ) {

        if ( iteeValidators.isNull( value ) ) { throw new TypeError( 'Root path cannot be null ! Expect a non empty string.' ) }
        if ( iteeValidators.isUndefined( value ) ) { throw new TypeError( 'Root path cannot be undefined ! Expect a non empty string.' ) }
        if ( iteeValidators.isNotString( value ) ) { throw new TypeError( `Root path cannot be an instance of ${value.constructor.name} ! Expect a non empty string.` ) }
        if ( iteeValidators.isEmptyString( value ) ) { throw new TypeError( 'Root path cannot be empty ! Expect a non empty string.' ) }
        if ( iteeValidators.isBlankString( value ) ) { throw new TypeError( 'Root path cannot contain only whitespace ! Expect a non empty string.' ) }

        this._rootPath = value;

    }

    setRootPath ( value ) {

        this.rootPath = value;
        return this

    }

    _initApplications ( config ) {

        if ( config.case_sensitive_routing ) { this.applications.set( 'case sensitive routing', config.case_sensitive_routing ); }
        if ( config.env ) { this.applications.set( 'env', config.env ); }
        if ( config.etag ) { this.applications.set( 'etag', config.etag ); }
        if ( config.jsonp_callback_name ) { this.applications.set( 'jsonp callback name', config.jsonp_callback_name ); }
        if ( config.jsonp_escape ) { this.applications.set( 'json escape', config.jsonp_escape ); }
        if ( config.jsonp_replacer ) { this.applications.set( 'json replacer', config.jsonp_replacer ); }
        if ( config.jsonp_spaces ) { this.applications.set( 'json spaces', config.jsonp_spaces ); }
        if ( config.query_parser ) { this.applications.set( 'query parser', config.query_parser ); }
        if ( config.strict_routing ) { this.applications.set( 'strict routing', config.strict_routing ); }
        if ( config.subdomain_offset ) { this.applications.set( 'subdomain offset', config.subdomain_offset ); }
        if ( config.trust_proxy ) { this.applications.set( 'trust proxy', config.trust_proxy ); }
        if ( config.views ) { this.applications.set( 'views', config.views ); }
        if ( config.view_cache ) { this.applications.set( 'view cache', config.view_cache ); }
        if ( config.view_engine ) { this.applications.set( 'view engine', config.view_engine ); }
        if ( config.x_powered_by ) { this.applications.set( 'x-powered-by', config.x_powered_by ); }

        this._initMiddlewares( config.middlewares );
        this._initRouters( config.routers );

    }

    _initMiddlewares ( middlewaresConfig ) {

        for ( let [ name, config ] of Object.entries( middlewaresConfig ) ) {

            if ( iteeValidators.isNotArray( config ) ) {
                throw new TypeError( `Invalid middlware configuration for ${name}, expecting an array of arguments to spread to middleware module, got ${config.constructor.name}` )
            }

            if ( this._initPackageMiddleware( name, config ) ) {

                console.log( `Use ${name} middleware from node_modules` );

            } else if ( this._initLocalMiddleware( name, config ) ) {

                console.log( `Use ${name} middleware from local folder` );

            } else {

                console.error( `Unable to register the middleware ${name} the package and/or local file doesn't seem to exist ! Skip it.` );

            }

        }

    }

    _initPackageMiddleware ( name, config ) {

        let success = false;

        try {

            this.applications.use( require( name )( ...config ) );
            success = true;

        } catch ( error ) {

            if ( !error.code || error.code !== 'MODULE_NOT_FOUND' ) {

                console.error( `The middleware "${name}" seems to encounter internal error.` );
                console.error( error );

            }

        }

        return success

    }

    _initLocalMiddleware ( name, config ) {

        let success = false;

        try {

            const localMiddlewaresPath = path.join( this.rootPath, 'middlewares', name );
            this.applications.use( require( localMiddlewaresPath )( ...config ) );
            success = true;

        } catch ( error ) {

            console.error( error );

        }

        return success

    }

    _initRouters ( routers ) {

        for ( let [ baseRoute, routerPath ] of Object.entries( routers ) ) {

            if ( this._initPackageRouter( baseRoute, routerPath ) ) {

                console.log( `Use ${routerPath} router from node_modules over base route: ${baseRoute}` );

            } else if ( this._initLocalRouter( baseRoute, routerPath ) ) {

                console.log( `Use ${routerPath} router from local folder over base route: ${baseRoute}` );

            } else {

                console.error( `Unable to register the router ${routerPath} the package and/or local file doesn't seem to exist ! Skip it.` );

            }

        }

    }

    _initPackageRouter ( baseRoute, routerPath ) {

        let success = false;

        try {

            this.applications.use( baseRoute, require( routerPath ) );
            success = true;

        } catch ( error ) {

            if ( !error.code || error.code !== 'MODULE_NOT_FOUND' ) {

                console.error( `The router "${name}" seems to encounter internal error.` );
                console.error( error );

            }

        }

        return success

    }

    _initLocalRouter ( baseRoute, routerPath ) {

        let success = false;

        try {

            const localRoutersPath = path.join( this.rootPath, 'routers', routerPath );
            this.applications.use( baseRoute, require( localRoutersPath ) );
            success = true;

        } catch ( error ) {

            if ( error instanceof TypeError && error.message === 'Found non-callable @@iterator' ) {

                console.error( `The router "${name}" seems to encounter error ! Are you using an object instead an array for router configuration ?` );

            }

            console.error( error );

        }

        return success

    }

    _initDatabases ( config ) {

        for ( let configIndex = 0, numberOfDatabasesConfigs = config.length ; configIndex < numberOfDatabasesConfigs ; configIndex++ ) {

            const databaseConfig = config[ configIndex ];
            const dbType         = databaseConfig.type;
            const dbFrom         = databaseConfig.from;
            const dbName         = `${( databaseConfig.name ) ? databaseConfig.name : `${dbType}_${configIndex}`}`;

            try {

                let database = null;

                if ( iteeValidators.isDefined(dbFrom)) {

                    // In case user specify a package where take the database of type...
                    database = new require(dbFrom)[ dbType ]( {
                        ...{
                            application: this.applications,
                            router:      this.router
                        },
                        ...databaseConfig
                    } );

                } else {

//                    // Else try to use auto registered database
//                    database = new Databases[ dbType ]( {
//                        ...{
//                            application: this.applications,
//                            router:      this.router
//                        },
//                        ...databaseConfig
//                    } )

                }

                // Todo move in start
                database.connect();

                this.databases.set( dbName, database );

            } catch ( error ) {

                console.error( `Unable to create database of type ${dbType} due to ${error.name}` );
                console.error( error.message );
                console.error( error.stack );

            }

        }

    }

    _initServers ( config ) {

        const _config = ( iteeValidators.isArray( config ) ) ? config : [ config ];

        for ( let configId = 0, numberOfConfigs = _config.length ; configId < numberOfConfigs ; configId++ ) {

            let configElement = _config[ configId ];
            let server        = null;

            if ( configElement.type === 'https' ) {

                const options = {
                    pfx:        configElement.pfx,
                    passphrase: configElement.passphrase
                };

                server = https.createServer( options, this.applications );

            } else {

                server = http.createServer( this.applications );

            }

            server.name            = configElement.name || `${( configElement.name ) ? configElement.name : 'Server_' + configId}`;
            server.maxHeadersCount = configElement.max_headers_count;
            server.timeout         = configElement.timeout;
            server.type            = configElement.type;
            server.host            = configElement.host;
            server.port            = configElement.port;
            server.env             = configElement.env;
            server.listen( configElement.port, configElement.host, () => {
                console.log( `${server.name} start listening on ${server.type}://${server.host}:${server.port} at ${new Date()} under ${server.env} environment.` );
            } );

            this.servers.set( server.name, server );

        }

    }

    /**
     *
     * @param databaseKey
     * @param eventName
     * @param callback
     */
    databaseOn ( databaseKey, eventName, callback ) {} // eslint-disable-line no-unused-vars

    serverOn ( serverName, eventName, callback ) {

        this.servers[ serverName ].on( eventName, callback );

    }

    serversOn ( serverKey, eventName, callback ) {

        //TODO: filter availaible events
        // [ 'request', 'connection', 'close', 'timeout', 'checkContinue', 'connect', 'upgrade', 'clientError' ]
        for ( let serverKey in this.servers ) {
            this.serverOn( serverKey, eventName, callback );
        }

    }

    start () {

    }

    stop ( callback ) {

        const numberOfServers   = this.servers.size;
        const numberOfDatabases = this.databases.size;
        let shutDownServers     = 0;
        let closedDatabases     = 0;

        if ( numberOfServers === 0 && numberOfDatabases === 0 ) {
            if ( callback ) { callback(); }
            return
        }

        for ( const [ serverName, server ] of this.servers ) {

            server.close( () => {

                shutDownServers++;
                console.log( `The ${serverName} listening on ${server.type}://${server.host}:${server.port} is shutted down.` );

                if ( shutDownServers < numberOfServers ) {
                    return
                }

                if ( numberOfDatabases === 0 ) {
                    if ( callback ) { callback(); }
                    return
                }

                for ( const [ databaseName, database ] of this.databases ) {

                    database.close( () => {

                        closedDatabases++;
                        console.log( `Connection to ${databaseName} is closed.` );

                        if ( closedDatabases < numberOfDatabases ) {
                            return
                        }

                        if ( callback ) { callback(); }

                    } );

                }

            } );

        }

    }

    closeServers () {

    }

}

exports.TBackendManager = TBackendManager;
//# sourceMappingURL=itee-server.cjs.js.map
