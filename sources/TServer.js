/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

import express        from 'express'
import http           from 'http'
import https          from 'https'
import * as Databases from 'itee-database'
import {
    isArray,
    isBlankString,
    isEmptyString,
    isFunction,
    isNotArray,
    isNotString,
    isNull,
    isUndefined
}                     from 'itee-validators'
import path           from 'path'

class TServer {

    constructor ( parameters ) {

        this.rootPath     = parameters.rootPath
        this.applications = express()
        this.router       = express.Router
        this.databases    = new Map()
        this.servers      = new Map()

        this._initApplications( parameters.applications )
        this._initDatabases( parameters.databases )
        this._initServers( parameters.servers )

    }

    get rootPath () {

        return this._rootPath

    }

    set rootPath ( value ) {

        if ( isNull( value ) ) { throw new TypeError( 'Root path cannot be null ! Expect a non empty string.' ) }
        if ( isUndefined( value ) ) { throw new TypeError( 'Root path cannot be undefined ! Expect a non empty string.' ) }
        if ( isNotString( value ) ) { throw new TypeError( `Root path cannot be an instance of ${value.constructor.name} ! Expect a non empty string.` ) }
        if ( isEmptyString( value ) ) { throw new TypeError( 'Root path cannot be empty ! Expect a non empty string.' ) }
        if ( isBlankString( value ) ) { throw new TypeError( 'Root path cannot contain only whitespace ! Expect a non empty string.' ) }

        this._rootPath = value

    }

    setRootPath ( value ) {

        this.rootPath = value
        return this

    }

    _initApplications ( config ) {

        if ( config.case_sensitive_routing ) { this.applications.set( 'case sensitive routing', config.case_sensitive_routing ) }
        if ( config.env ) { this.applications.set( 'env', config.env ) }
        if ( config.etag ) { this.applications.set( 'etag', config.etag ) }
        if ( config.jsonp_callback_name ) { this.applications.set( 'jsonp callback name', config.jsonp_callback_name ) }
        if ( config.jsonp_escape ) { this.applications.set( 'json escape', config.jsonp_escape ) }
        if ( config.jsonp_replacer ) { this.applications.set( 'json replacer', config.jsonp_replacer ) }
        if ( config.jsonp_spaces ) { this.applications.set( 'json spaces', config.jsonp_spaces ) }
        if ( config.query_parser ) { this.applications.set( 'query parser', config.query_parser ) }
        if ( config.strict_routing ) { this.applications.set( 'strict routing', config.strict_routing ) }
        if ( config.subdomain_offset ) { this.applications.set( 'subdomain offset', config.subdomain_offset ) }
        if ( config.trust_proxy ) { this.applications.set( 'trust proxy', config.trust_proxy ) }
        if ( config.views ) { this.applications.set( 'views', config.views ) }
        if ( config.view_cache ) { this.applications.set( 'view cache', config.view_cache ) }
        if ( config.view_engine ) { this.applications.set( 'view engine', config.view_engine ) }
        if ( config.x_powered_by ) { this.applications.set( 'x-powered-by', config.x_powered_by ) }

        this._initMiddlewares( config.middlewares )
        this._initRouters( config.routers )

    }

    _initMiddlewares ( config ) {

        for ( let middlewareName in config ) {

            if ( !Object.prototype.hasOwnProperty.call( config, middlewareName ) ) { continue }

            const middlewareConfig = config[ middlewareName ]

            if ( isNotArray( middlewareConfig ) ) {
                throw new TypeError( `Invalid middlware configuration, expect an array of argument to spread to middleware module, got ${middlewareConfig.constructor.name}` )
            }

            try {

                this.applications.use( require( middlewareName )( ...middlewareConfig ) )
                console.log( `Use ${middlewareName} middleware from node_modules` )

            } catch ( error ) {

                if ( !error.code || error.code !== 'MODULE_NOT_FOUND' ) {

                    console.error( `The middleware "${middlewareName}" seems to encounter internal error.` )
                    console.error( error )
                    continue

                }

                this._initLocalMiddleware( middlewareName, middlewareConfig )

            }

        }

    }

    _initLocalMiddleware ( name, config ) {

        try {

            const localMiddlewaresPath = path.join( this.rootPath, 'middlewares', name )
            this.applications.use( require( localMiddlewaresPath )( ...config ) )
            console.log( `Use ${name} middleware from local folder` )

        } catch ( error ) {

            if ( error instanceof TypeError && error.message === 'Found non-callable @@iterator' ) {

                console.error( `The middleware "${name}" seems to encounter internal error !` )
                console.error( error )

            } else {

                console.error( `Unable to register the middleware ${name} the package or local file doesn't seem to exist ! Skip it.` )
                console.error( error )

            }

        }

    }

    _initRouters ( routers ) {

        for ( let routerName in routers ) {

            if ( !Object.prototype.hasOwnProperty.call( routers, routerName ) ) { continue }

            const config    = routers[ routerName ]
            const baseRoute = config.baseRoute
            const options   = config.options

            try {

                const router = require( routerName )
                this.applications.use( baseRoute, isFunction( router ) ? router( ...options ) : router )
                console.log( `Use ${routerName} router from node_modules over base route: ${baseRoute}` )

            } catch ( error ) {

                if ( !error.code || error.code !== 'MODULE_NOT_FOUND' ) {

                    console.error( `The router "${routerName}" seems to encounter internal error.` )
                    console.error( error )
                    continue

                }

                this._initLocalRouter( routerName, baseRoute, options )

            }

        }

    }

    _initLocalRouter ( name, baseRoute, options ) {

        try {

            const localRoutersPath = path.join( this.rootPath, 'routers', name )
            const router           = require( localRoutersPath )
            this.applications.use( baseRoute, isFunction( router ) ? router( ...options ) : router )
            console.log( `Use ${name} router from local folder over base route: ${baseRoute}` )

        } catch ( error ) {

            if ( error instanceof TypeError && error.message === 'Found non-callable @@iterator' ) {

                console.error( `The router "${name}" seems to encounter internal error !` )
                console.error( error )

            } else {

                console.error( `Unable to register the router ${name} the package or local file doesn't seem to exist ! Skip it.` )
                console.error( error )

            }

        }

    }

    _initDatabases ( config ) {

        for ( let configIndex = 0, numberOfDatabasesConfigs = config.length ; configIndex < numberOfDatabasesConfigs ; configIndex++ ) {

            const databaseConfig = config[ configIndex ]
            const dbType         = databaseConfig.type
            const dbName         = `${( databaseConfig.name ) ? databaseConfig.name : 'Database_' + configIndex}`

            try {

                const database = new Databases[ dbType ]( this.applications, this.router, databaseConfig.plugins, databaseConfig ).connect()

                this.databases.set( dbName, database )

            } catch ( error ) {

                console.error( `Unable to create database of type ${dbType} due to ${error.name}` )
                console.error( error.message )
                console.error( error.stack )

            }

        }

    }

    _initServers ( config ) {

        const _config = ( isArray( config ) ) ? config : [ config ]

        for ( let configId = 0, numberOfConfigs = _config.length ; configId < numberOfConfigs ; configId++ ) {

            let configElement = _config[ configId ]
            let server        = null

            if ( configElement.type === 'https' ) {

                const options = {
                    pfx:        configElement.pfx,
                    passphrase: configElement.passphrase
                }

                server = https.createServer( options, this.applications )

            } else {

                server = http.createServer( this.applications )

            }

            server.name            = configElement.name || `${( configElement.name ) ? configElement.name : 'Server_' + configId}`
            server.maxHeadersCount = configElement.max_headers_count
            server.timeout         = configElement.timeout
            server.type            = configElement.type
            server.host            = configElement.host
            server.port            = configElement.port
            server.env             = configElement.env
            server.listen( configElement.port, configElement.host, () => {
                console.log( `${server.name} start listening on ${server.type}://${server.host}:${server.port} at ${new Date()} under ${server.env} environment.` )
            } )

            this.servers.set( server.name, server )

        }

    }

    /**
     *
     * @param databaseKey
     * @param eventName
     * @param callback
     */
    databaseOn ( databaseKey, eventName, callback ) {} // eslint-disable-line no-unused-vars

    serverOn ( eventName, callback ) {

        //TODO: filter availaible events
        // [ 'request', 'connection', 'close', 'timeout', 'checkContinue', 'connect', 'upgrade', 'clientError' ]

        for ( const [ serverName, server ] of this.servers ) {
            server.on( eventName, callback )
        }

    }

    start () {

        for ( let key in this.databases ) {
            this.databases[ key ].connect()
        }

        const currentDate = new Date()
        const currentEnv  = this.applications.get( 'env' )
        const port        = this.applications.get( 'port' )
        const hostName    = this.applications.get( 'hostName' )

        this.server.listen( port, hostName, () => {
            console.log( `Server start listening on : ${hostName}:${port} at ${currentDate} under ${currentEnv} environment.` )
            console.timeEnd( 'Server launch time' )
            console.log( '\n' )
        } )

    }

    stop ( callback ) {

        this.server.close( () => {

            console.log( 'Closed out remaining connections.' )

            const numberOfDatabases = this.databases.length
            let closedDatabases     = 0

            for ( let dbKey in this.databases ) {
                this.databases[ dbKey ].close( () => {

                    closedDatabases++

                    if ( closedDatabases < numberOfDatabases ) {
                        return
                    }

                    callback()

                } )
            }

        } )

    }

}

module.exports = TServer
