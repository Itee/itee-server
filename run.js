/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Run
 *
 * @description The main entry point for running node server.
 */

console.log( 'Start Node Server ' + process.version + '\n' )
console.time( 'Server launch time' )

// /////////////////////////////
// ///////// GLOBAL ////////////
// /////////////////////////////
var os = require( 'os' )

console.log( 'GLOBAL CONST :' )
console.log( '\t__dirname : ' + __dirname )             // eslint-disable-line
console.log( '\t__filename : ' + __filename )           // eslint-disable-line
console.log( '\tNumber of CPUs : ' + os.cpus().length ) // eslint-disable-line
console.log( '\tTotal memory : ' + os.totalmem() )      // eslint-disable-line
console.log( '\tFree memory : ' + os.freemem() )        // eslint-disable-line
console.log( '\tMemory usage : ' )                      // eslint-disable-line
console.log( process.memoryUsage() )                    // eslint-disable-line
console.log( '\n' )

console.log( 'CONFIG :' )
var config = require( './configs/itee.conf' )( process )
console.log( config )
console.log( '\n' )

// ////////////////////////////////////
// ////////// DATABASE ////////////////
// ////////////////////////////////////
var database = require( './databases/TDatabase.js' )( config.database )

// ////////////////////////////////////
// ////////// APPLICATION /////////////
// ////////////////////////////////////
var application = require( './applications/TServerApplication' )( config.application )

// ////////////////////////////////////
// //////////// ROUTES ////////////////
// ////////////////////////////////////
require( './routes/routes' )( application )

// ////////////////////////////////////
// ////////// SERVER HTTP /////////////
// ////////////////////////////////////
var server = require( './server/HttpServer.js' )( application, config.server )

// ////////////////////////////////////
// //////////// PROCESS ///////////////
// ////////////////////////////////////
process.on( 'SIGTERM', function () {

    server.close( function () {

        console.log( 'Closed out remaining connections.' )

        // Close db connections, etc.
        database.connection.close( function () {
            console.log( 'Fermeture de la connexion à la base de données dût à la fermeture de l\'application !' )
            process.exit( 0 )
        } )

    } )

} )

process.on( 'SIGINT', function () {

    server.close( function () {

        console.log( 'Closed out remaining connections.' )

        // Close db connections, etc.
        database.connection.close( function () {

            console.log( 'Fermeture de la connexion à la base de données dût à la fermeture de l\'application !' )
            process.exit( 0 )

        } )

    } )

} )
