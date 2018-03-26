/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes
 *
 * @description Main entry point to extend application routes
 */

const buildRouteFor = require( './route_builder' )

/**
 * This module add routes to the server.
 * It manage by default the index route ('/'), resources route ('/resources'), view route ('/views') and 404 route ('/*')
 * @param app - The app to extend
 * @returns {*} - The extended app
 */
module.exports = function routing ( app ) {

    var env = app.get( 'env' )
    //TODO: allow external route to be loaded from here
    //TODO: Use _config to allow/disallow some predefined routes (like uploads for example) in function of the server type wanted

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

    app.use( '/', require( './index/index.js' ) )
    app.use( '/docs', require( './docs/docs.js' ) )
    app.use( '/resources', require( './resources/resources.js' ) )
    app.use( '/downloads', require( './downloads/downloads.js' ) )
    app.use( '/views', require( './views/views.js' )( env ) )
    app.use( '/uploads', require( './uploads/uploads.js' ) )

    app.use( '/users', buildRouteFor( 'User' ) )
    app.use( '/companies', buildRouteFor( 'Company' ) )
    app.use( '/objects', buildRouteFor( 'Objects3D' ) )
    app.use( '/curves', buildRouteFor( 'Curves' ) )
    app.use( '/geometries', buildRouteFor( 'Geometries' ) )
    app.use( '/materials', buildRouteFor( 'Materials' ) )
    app.use( '/textures', buildRouteFor( 'Textures' ) )

    app.use( '*/*', require( './404/404.js' ) )

}
