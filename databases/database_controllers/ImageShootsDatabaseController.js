/**
 * Created by Tristan on 08/03/2017.
 */
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
 * This singleton module make easier the cloud point data routing from the database to the end user.
 * @module Modules/CloudPointController
 *
 * @author Tristan Valcke <valcke.tristan@gmail.com>
 * @license LGPLv3
 *
 */

var ImageShoot = require( 'mongoose' ).model( 'ImageShoot' )
var i          = require( 'i-return' )

/**
 * This singleton module make easier the cloud point data routing from the database to the end user.
 * @type {{getInstance}}
 */
var ImageShootsDatabaseController = (function () {

    var _instance = null

    /**
     * Return the WorldCellDatabaseController interface
     * @returns {{getAllCloudPoint: getAllCloudPoint, getCloudWithId: getCloudWithId, getAllCubePointForCloudWithId: getAllCubePointForCloudWithId, getCubePointWithIdForCloudWithId:
     *     getCubePointWithIdForCloudWithId, getCubePointMultiSampled: getCubePointMultiSampled}}
     */
    function createInstance () {
        /*
         * PRIVATE METHODS
         */

        /**
         * Check if requested params named 'dataName' exist in request.body, request.params or request.query
         *
         * @param dataName - The property name to looking for
         * @param request - The server request
         * @param response - The server response
         * @returns {*} - Return the property or return error to the end user if the property doesn't exist
         * @private
         */
        function __checkData ( dataName, request, response ) {

            if ( !request.body && !request.params && !request.query ) {

                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'Aucun paramètre n\'a été reçu !'
                }, response )

            }

            if ( request.body[ dataName ] ) {

                return request.body[ dataName ]

            } else if ( request.params[ dataName ] ) {

                return request.params[ dataName ]

            } else if ( request.query[ dataName ] ) {

                return request.query[ dataName ]

            } else {

                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: dataName + " n'existe pas dans les paramètres !"
                }, response )

            }
        }

        /**
         * Check if the property 'idName' exist in request.params properties,
         * return the property if exist, else return an error to end user.
         *
         * @param idName - The id property to looking for
         * @param request - The server request
         * @param response - The server response
         * @returns {*} - Return the id property or return error to the end user if the property doesn't exist
         * @private
         */
        function __checkIdParam ( idName, request, response ) {

            if ( !request.params ) {

                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'Aucun paramètre n\'a été reçu !'
                }, response )

            }

            if ( !request.params[ idName ] ) {

                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'L\'id  est null !'
                }, response )

            }

            return request.params[ idName ]

        }

        /**
         * Check if the property 'idName' exist in request.body properties,
         * return the property if exist, else return an error to end user.
         *
         * @param idName - The id property to looking for
         * @param request - The server request
         * @param response - The server response
         * @returns {*} - Return the id property or return error to the end user if the property doesn't exist
         * @private
         */
        function __checkBodyData ( idName, request, response ) {

            if ( !request.body ) {
                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'Aucun paramètre n\'a été reçu !'
                }, response )
            }

            if ( !request.body[ idName ] ) {
                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'L\'id  est null !'
                }, response )
            }

            return request.body[ idName ]

        }

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         *
         * @param min - The minimum (inclusive) range value for random number
         * @param max - The maximum (inclusive) range value for random number
         * @returns {Number} - A random number between man and max
         * @private
         */
        function _getRandomInt ( min, max ) {
            return Math.floor( Math.random() * (max - min + 1) ) + min
        }

        /*
         * REST API
         */
        function createImageShoots ( request, response ) {

            console.log( 'createImageShoots' )

//            console.log("request:")
//            console.log(request)
//
//            console.log("body:")
//            console.log(request.body)
//
//            console.log("params:")
//            console.log(request.params)
//
//            console.log("query:")
//            console.log(request.query)


            var newModel = new ImageShoot( {
                data: request.body
            } )

            newModel.save( i.return( response ) )

            i.returnData( "createImageShoots: ...", response )

        }

        /**
         * The method will ask the database to find all the cloudpoints,
         * it will wrap database result in a object like:
         *
         * {
         *     Items: clouds
         * }
         *
         * @param request - The user request
         * @param response - The server response
         */
        function readImageShoots ( request, response ) {

            console.log( 'readImageShoots' )

//            console.log("request:")
//            console.log(request)
//
//            console.log("body:")
//            console.log(request.body)
//
//            console.log("params:")
//            console.log(request.params)
//
//            console.log("query:")
//            console.log(request.query)

            ImageShoot.find( i.return( response ) )


        }

        function updateImageShoots ( request, response ) {

            console.log( 'updateImageShoots' )

            i.returnData( "updateImageShoots: ...", response )

        }

        function deleteImageShoots ( request, response ) {

            console.log( 'deleteImageShoots' )

            i.returnData( "deleteImageShoots: ...", response )

        }


        function createImageShootsWithId ( request, response ) {

            console.log( 'createImageShootsWithId' )

            var id = __checkIdParam( 'id', request, response )
            ImageShoot.findById( id, i.return( response ) )

        }

        /**
         * Get a specific Cloud Point with given id
         *
         * @param request - The user request
         * @param response - The server response
         */
        function readImageShootsWithId ( request, response ) {

            console.log( 'readImageShootsWithId' )

            var id = __checkIdParam( 'id', request, response )
            ImageShoot.findById( id, i.return( response ) )

        }

        /**
         * Allow to update data store in a specific cloud point
         *
         * @param request - The user request
         * @param response - The server response
         */
        function updateImageShootsWithId ( request, response ) {

            console.log( 'updateImageShootsWithId' )

            var id = __checkIdParam( 'id', request, response )
            ImageShoot.findById( id, i.return( response, {
                'returnData': function ( imageShoot ) {

                    // update model here

                    imageShoot.save( i.return( response ) );
                }
            } ) )

        }

        function deleteImageShootsWithId ( request, response ) {

            console.log( 'deleteImageShootsWithId' )

            var id = __checkIdParam( 'id', request, response )
            i.returnData( "deleteImageShootsWithId: " + id, response )

        }

        // Return the public interface
        return {
            create: createImageShoots,
            read:   readImageShoots,
            update: updateImageShoots,
            delete: deleteImageShoots,

            createOne: createImageShootsWithId,
            readOne:   readImageShootsWithId,
            updateOne: updateImageShootsWithId,
            deleteOne: deleteImageShootsWithId
        }
    }

    return {
        /**
         * Hold the Singleton WorldCellDatabaseController instance,
         * or create it if not exist
         *
         * @returns {WorldCellDatabaseController} - The singleton instance
         */
        getInstance: function () {
            if ( !_instance ) {
                _instance = createInstance()
            }
            return _instance
        }
    }

})()

/**
 * Export the singleton instance as module
 * @type {*|WorldCellDatabaseController}
 */
module.exports = ImageShootsDatabaseController.getInstance()
