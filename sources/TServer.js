/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

const fs   = require( 'fs' )
const path = require( 'path' )

const busBoy       = require( 'express-busboy' )
const compression  = require( 'compression' )
const errorHandler = require( 'errorhandler' )
const express      = require( 'express' )
const favicon      = require( 'serve-favicon' )
const morgan       = require( 'morgan' )
const rfs          = require( 'rotating-file-stream' )

const Databases = require( 'itee-database' )

const http = require( 'http' )

class TServer {

    constructor ( parameters ) {

        this.rootPath     = parameters.rootPath
        this.applications = express()
        this.router       = express.Router
        this.databases    = {}
        this.server       = null

        this._initApplications( parameters.applications )
        this._initDatabases( parameters.databases )
        this._initServers( parameters.servers )

    }

    _initApplications ( config ) {

        this.applications = express()

        this.applications.set( 'env', config.env )
        this.applications.set( 'hostName', config.hostname )
        this.applications.set( 'port', config.port )
        this.applications.set( 'db uri', config.db_uri )
        this.applications.set( 'views', config.views )
        this.applications.set( 'view engine', config.view_engine )
        this.applications.set( 'jsonp callback name', config.jsonp_callback_name )
        this.applications.set( 'json replacer', config.jsonp_replacer )
        this.applications.set( 'json spaces', config.jsonp_spaces )

        if ( config.trust_proxy ) {
            this.applications.enable( 'trust proxy' )
        } else {
            this.applications.disabled( 'trust proxy' )
        }

        if ( config.case_sensitive_routing ) {
            this.applications.enable( 'case sensitive routing' )
        } else {
            this.applications.disabled( 'case sensitive routing' )
        }

        if ( config.strict_routing ) {
            this.applications.enable( 'strict routing' )
        } else {
            this.applications.disabled( 'strict routing' )
        }

        if ( config.view_cache ) {
            this.applications.enable( 'view cache' )
        } else {
            this.applications.disabled( 'view cache' )
        }

        this._initMiddlewares( config.middlewares )
        this._initRouters( config.routers )

    }

    _initMiddlewares ( config ) {

        busBoy.extend( this.applications, config.busBoy )

        // create a rotating write stream
        const accessLogStream = rfs( config.morgan.fileName, {
            interval: config.morgan.interval, // rotate daily
            path:     (() => {

                const logFilePath  = config.morgan.directoryPath
                const logDirectory = path.dirname( logFilePath )

                // Ensure log directory exists
                fs.existsSync( logDirectory ) || fs.mkdirSync( logDirectory )

                return logDirectory

            })()
        } )
        this.applications.use( morgan( 'combined', { stream: accessLogStream } ) )

        this.applications.use( errorHandler() )
        this.applications.use( favicon( config.favicon.path ) )
        this.applications.use( compression() )

    }

    _initRouters ( routers ) {

        // Services
        // Todo: buildServiceFor( 'Foo' )

        // Register local services routes
        for ( let routerKey in routers ) {

            const routerPath = path.join( this.rootPath, 'servers/routes', routers[ routerKey ] )
            try {
                let router = require( routerPath )
                console.log( `Add router to: ${routerKey}` )
                this.applications.use( routerKey, router )
            } catch ( error ) {
                console.error( `Unable to find router at: ${routerPath}` )
            }

        }

    }

    _initDatabases ( config ) {

        for ( let configIndex = 0, numberOfDatabasesConfigs = config.length ; configIndex < numberOfDatabasesConfigs ; configIndex++ ) {

            const databaseConfig = config[ configIndex ]
            const dbType         = databaseConfig.type

            switch ( dbType ) {

                case 'mongo':
                    const dbName = `${(databaseConfig.name) ? databaseConfig.name : 'mongo_' + configIndex}`

                    // TODO: Check if exist
                    const TMongoDBDatabase = Databases.TMongoDBDatabase

                    this.databases[ dbName ] = new TMongoDBDatabase( this.applications, this.router, databaseConfig.plugins, databaseConfig )
                    break;

                default:
                    console.error( `Unable to create database of type ${dbType}` )
            }
        }

    }

    _initServers ( config ) {

        this.server                 = http.createServer( this.applications )
        this.server.maxHeadersCount = config.max_headers_count
        this.server.timeout         = config.timeout;

    }

    _buildRoutesFor ( controller ) {

        return this.router( { mergeParams: true } )
                   .put( '/', controller.create.bind( controller ) )
                   .post( '/', controller.read.bind( controller ) )
                   .patch( '/', controller.update.bind( controller ) )
                   .delete( '/', controller.delete.bind( controller ) )
                   .put( '/:id', controller.create.bind( controller ) )
                   .post( '/:id', controller.read.bind( controller ) )
                   .patch( '/:id', controller.update.bind( controller ) )
                   .delete( '/:id', controller.delete.bind( controller ) )
                   .all( '*/*', ( request, response, next ) => {

                       response.status( 404 ).send()

                   } )

    }

    databaseOn ( databaseKey, eventName, callback ) {}

    serverOn ( serverKey, eventName, callback ) {

        //TODO: filter availaible events
        // [ 'request', 'connection', 'close', 'timeout', 'checkContinue', 'connect', 'upgrade', 'clientError' ]

        this.server.on( eventName, callback )
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
