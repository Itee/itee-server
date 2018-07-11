/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Routes/TRouteBuilder
 *
 * @description This module will create CRUD routes for the given schemaName
 */

const DatabaseController = require( '../../_databases/_mongodb/_controllers/TDatabaseController.js' )
const mongoose           = require( 'mongoose' )
const express            = require( 'express' )
const path               = require( 'path' )
const fs                 = require( 'fs' )

/**
 *
 * @param schemaName
 * @constructor
 */
function BuildRoutesFor ( schemaName ) {

    const ressource  = mongoose.model( schemaName )
    const controller = new DatabaseController( ressource )
    const router     = express.Router( { mergeParams: true } )
                              .put( '/', controller.create.bind( controller ) )
                              .post( '/', controller.read.bind( controller ) )
                              .patch( '/', controller.update.bind( controller ) )
                              .delete( '/', controller.delete.bind( controller ) )
                              .put( '/:id', controller.create.bind( controller ) )
                              .post( '/:id', controller.read.bind( controller ) )
                              .patch( '/:id', controller.update.bind( controller ) )
                              .delete( '/:id', controller.delete.bind( controller ) )
                              .all( '*/*', ( request, response, next ) => {

                                  const pathToFile = path.join( __dirname, '../..', '/views/404.html' )

                                  fs.stat(
                                      pathToFile,
                                      ( error, stats ) => {
                                          if ( error === null && stats.isFile() ) {
                                              response.status( 404 ).sendFile( pathToFile )
                                          } else {
                                              console.error( error )
                                              next()
                                          }
                                      }
                                  )

                              } )

    return router

}

module.exports = BuildRoutesFor
