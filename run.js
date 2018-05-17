//var app = require('express')();
//require('express-ws')(app);
//
//app.use(function (req, res, next) {
//
//  console.log('middleware');
//  req.testing = 'testing';
//  return next();
//
//});
//
//app.get('/', require( './routes/index/index.js' ) );
//
//app.ws('/web-socket', function(ws, req) {
//
//  console.log('socket', req.testing);
//
//  ws.on('message', function(msg) {
//
//    console.log(msg);
//    this.send("tralala i web-socket")
//
//  });
//
//});
//
//app.listen(12345);

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Run
 *
 * @description The main entry point for running node server.
 */

console.log( `Start Node Server ${process.version}` )
console.time( 'Server launch time' )

// /////////////////////////////
// ///////// GLOBAL ////////////
// /////////////////////////////
var os = require( 'os' )

console.log( 'GLOBAL CONST :' )
console.log( `\t__dirname : ${__dirname}` )             // eslint-disable-line
console.log( `\t__filename : ${__filename}` )           // eslint-disable-line
console.log( `\tNumber of CPUs : ${os.cpus().length}` ) // eslint-disable-line
console.log( `\tTotal memory : ${os.totalmem()}` )      // eslint-disable-line
console.log( `\tFree memory : ${os.freemem()}` )        // eslint-disable-line
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
var database = require( './sources/databases/TDatabase.js' )( config.database )

// ////////////////////////////////////
// ////////// APPLICATION /////////////
// ////////////////////////////////////
var application = require( './sources/applications/TServerApplication' )( config.application )

// ////////////////////////////////////
// //////////// ROUTES ////////////////
// ////////////////////////////////////
require( './sources/routes/TRouter' )( application )

// ////////////////////////////////////
// ////////// SERVER HTTP /////////////
// ////////////////////////////////////
var server = require( './sources/server/HttpServer.js' )( application, config.server )

// ////////////////////////////////////
// //////////// PROCESS ///////////////
// ////////////////////////////////////
process.on( 'SIGTERM', shutDown )
process.on( 'SIGINT', shutDown )

function shutDown() {

    server.close( () => {

        console.log( 'Closed out remaining connections.' )

        // Close db connections, etc.
        database.connection.close( () => {

            console.log( 'Fermeture de la connexion à la base de données dût à la fermeture de l\'application !' )
            process.exit( 0 )

        } )

    } )

}
