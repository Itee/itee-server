/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes
 *
 * @description Main entry point to extend application routes
 */
const fs            = require( 'fs' )
const path          = require( 'path' )
const buildRouteFor = require( './TRouteBuilder' )


/**
 * Allow to search all files under filePaths in a recursive way
 *
 * @param {Array.<string>|string} filePaths - The files paths where search files
 * @returns {Array} - The paths of finded files
 * @private
 */
function _getFilesPathsUnder ( filePaths ) {

    let files = []

    if ( Array.isArray( filePaths ) ) {

        let filePath = undefined
        for ( let pathIndex = 0, numberOfPaths = filePaths.length ; pathIndex < numberOfPaths ; pathIndex++ ) {

            filePath = filePaths[ pathIndex ]
            checkStateOf( filePath )

        }

    } else {

        checkStateOf( filePaths )

    }

    return files

    function getFilesPathsUnderFolder ( folder ) {

        fs.readdirSync( folder ).forEach( ( name ) => {

            const filePath = path.resolve( folder, name )
            checkStateOf( filePath )

        } )

    }

    function checkStateOf ( filePath ) {

        if ( !fs.existsSync( filePath ) ) {
            console.error( 'SchemaRegister: Invalid file path "' + filePath + '"' )
            return
        }

        const stats = fs.statSync( filePath )
        if ( stats.isFile() ) {

            files.push( filePath )

        } else if ( stats.isDirectory() ) {

            Array.prototype.push.apply( files, getFilesPathsUnderFolder( filePath ) )

        } else {

            console.error( "Invalid stat object !" )

        }

    }

}

/**
 * This module add _routes to the _server.
 * It manage by default the index route ('/'), resources route ('/resources'), view route ('/views') and 404 route ('/*')
 * @param app - The app to extend
 * @returns {*} - The extended app
 */
module.exports = function routing ( app, databases, parameters ) {

    //TODO: allow external route to be loaded from here
    //TODO: Use _config to allow/disallow some predefined _routes (like uploads for example) in function of the _server type wanted

    //    app.ws('/web-socket', function(ws, req) {
    //
    //        console.log('socket', req.testing);
    //
    //        ws.on('message', function(msg) {
    //
    //            console.log(msg);
    //            ws.send("tralala i web-socket")
    //
    //        });
    //
    //    });
    app.use( '*/*', ( request, response, next ) => {

        //        console.log( request._remoteAddress )
        //        console.log( request.originalUrl )
        //        console.log( request.method )
        //        console.log( request.params )
        //        console.log( request.body )
        //        console.log( request.query )
        //        console.log( '\n' )

        next()

    } )

    //    app.all( '/', ( request, response, next ) => {
    //
    //        const urlParams = request.originalUrl.slice(-1)
    //        response.redirect(`/views/index.pug${urlParams}`)
    //
    //    } )

    // Services
    // Todo: buildServiceFor( 'Foo' )
    app.use( '/', require( './index/index.js' ) )

    //    app.use( '/docs', require( './docs/docs.js' ) )
    //    app.use( '/resources', require( './resources/resources.js' ) )
    //    app.use( '/downloads', require( './downloads/downloads.js' ) )
    //    app.use( '/uploads', require( './uploads/uploads.js' ) )

    // Register local routes
    const routersFilesPaths = _getFilesPathsUnder( __dirname )
    for ( let routerIndex = 0, numberOfRouters = routersFilesPaths.length ; routerIndex < numberOfRouters ; routerIndex++ ) {

        const routerPath = routersFilesPaths[ routerIndex ]
        const routerName = path.basename( routerPath )
        app.use( routerName, require( routerPath ) )

    }

    // Register Database routes
    const databasePluginsBasePath = path.join( __dirname, '..', 'node_modules' )
    const databasesPluginsNames   = parameters.plugins
    for ( let index = 0, numberOfPlugins = databasesPluginsNames.length ; index < numberOfPlugins ; index++ ) {

        const pluginPath    = path.join( databasePluginsBasePath, databasesPluginsNames[ index ] )
        const plugin        = require( pluginPath )
        const pluginsRoutes = plugin.routes

        for ( let routeKey in pluginsRoutes ) {
            app.use( routeKey, buildRouteFor( pluginsRoutes[ routeKey ] ) )
        }

    }

    app.use( '*/*', ( request, response, next ) => {

        response.status( 404 ).send()

    } )

}
