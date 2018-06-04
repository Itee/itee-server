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

var Mesh = require( 'mongoose' ).model( 'Mesh' )
var i          = require( 'i-return' )

/**
 * This singleton module make easier the cloud point data routing from the database to the end user.
 * @type {{getInstance}}
 */
var MeshesDatabaseController = (function () {

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
         * Check if the property 'dataName' exist in request.body properties,
         * return the property if exist, else return an error to end user.
         *
         * @param dataName - The data property to looking for
         * @param request - The server request
         * @param response - The server response
         * @returns {*} - Return the id property or return error to the end user if the property doesn't exist
         * @private
         */
        function __checkBodyData ( dataName, request, response ) {

            var requestBody = request.body
            if ( !requestBody ) {
                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'Aucun paramètre n\'a été reçu !'
                }, response )
            }

            var requestBodyData = requestBody[ dataName ]
            if ( !requestBodyData ) {
                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'La donnée est null !'
                }, response )
            }

            var requestBodyDataUncompressed = JSON.parse( requestBodyData )
            if ( Array.isArray( requestBodyDataUncompressed ) && requestBodyDataUncompressed.length === 0 ) {
                i.returnError( {
                    title:   'Erreur de paramètre',
                    message: 'Le tableau de données est vide !'
                }, response )
            }

            return requestBodyDataUncompressed

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
        function createMeshes ( request, response ) {

            console.log( 'createMeshes' )

            console.log("body:")
            console.log(request.body)

            console.log("params:")
            console.log(request.params)

            console.log("query:")
            console.log(request.query)


            var newMesh = new Mesh( {
                data: request.body
            } )

            newMesh.save( i.return( response ) )

            i.returnData( "createMeshes: ...", response )

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
        var readMeshesRequestCounter = 0
        function readMeshes ( request, response ) {

            var timerLabel = 'readMeshes_' + readMeshesRequestCounter++
            console.time( timerLabel )

            var query = Mesh.find( {} )
                            .select( {
                                "data": 0,
                                "__v":  0
                            } );

            query.exec( i.return( response, {
                'afterAll': function () {

                    console.timeEnd( timerLabel )

                }
            } ) )


        }

        var readAllMeshesRequestCounter = 0

        function readAllMeshes ( request, response ) {

            var timerLabel = 'readAllMeshes_' + readAllMeshesRequestCounter++
            console.time( timerLabel )

            var meshIds = __checkBodyData( 'ids', request, response )

            Mesh.find( {
                    '_id': { $in: meshIds }
                } )
                .lean()
                .exec( i.return( response, {
                    'returnData': function ( data ) {

                        var numberOfMeshes = data.length
                        if ( numberOfMeshes === 0 ) { i.returnNotFound( response ) }

                        // 4 bytes for numberOfMeshes and 4 bytes per sub-buffer size
                        var headerBufferLength = 4 + 4 * numberOfMeshes
                        var headerBuffer       = Buffer.allocUnsafe( headerBufferLength )
                        //                        headerBuffer.fill( 0 )
                        //                        console.log( 'header: ' + numberOfMeshes )
                        var headerBufferOffset = headerBuffer.writeUInt32BE( numberOfMeshes, 0 )
                        var totalBuffersLength = headerBufferLength

                        var meshesBuffers = data.map( function ( meshData ) {

                            var meshId       = meshData._id.toString()
                            var meshIdLength = meshId.length

                            var meshBuffer     = meshData.data
                            var meshBufferSize = meshBuffer.length()

                            var labeledBufferSize = meshIdLength + meshBufferSize

                            // Update header buffer and concat data
                            //                            console.log('header: ' + labeledBufferSize)
                            headerBufferOffset = headerBuffer.writeUInt32BE( labeledBufferSize, headerBufferOffset )
                            totalBuffersLength += labeledBufferSize

                            var labeledBuffer = Buffer.allocUnsafe( labeledBufferSize )
                            //                            labeledBuffer.fill( 0 )

                            // Write mesh id into labeledBuffer
                            for ( var charIndex = 0 ; charIndex < meshIdLength ; ++charIndex ) {
                                labeledBuffer[ charIndex ] = meshId.charCodeAt( charIndex )
                            }

                            // Write mesh buffer into labeledBuffer
                            meshBuffer.buffer.copy( labeledBuffer, meshIdLength, 0, meshBufferSize )

                            return labeledBuffer

                        } )

                        meshesBuffers.unshift( headerBuffer )

                        var concatenedBuffers = Buffer.concat( meshesBuffers, totalBuffersLength )
                        response.status( 200 ).end( concatenedBuffers, 'binary' )

                    },
                    'afterAll':   function () {

                        console.timeEnd( timerLabel )

                    }
                } ) )

        }

        var updateMeshesRequestCounter = 0
        function updateMeshes ( request, response ) {

//            var timerLabel = 'ReadMeshes_' + readMeshesRequestCounter++
//            console.time( timerLabel )

            i.returnData( "updateMeshes: ...", response )

        }

        function deleteMeshes ( request, response ) {

            console.log( 'deleteMeshes' )

            i.returnData( "DeleteMeshes: ... Nooo seriously ???", response )

        }


        function createMeshesWithId ( request, response ) {

            console.log( 'createMeshesWithId' )

            var meshId = __checkIdParam( 'id', request, response )
            Mesh.findById( meshId, i.return( response ) )

        }

        /**
         * Get a specific Cloud Point with given id
         *
         * @param request - The user request
         * @param response - The server response
         */
        var readMeshesWithIdRequestCounter = 0
        function readMeshesWithId ( request, response ) {

            var timeLabel = "readMeshesWithId" + readMeshesWithIdRequestCounter++
            console.time( timeLabel )

            var meshId = __checkIdParam( 'id', request, response )

            Mesh.find()
                .where('_id').equals(meshId)
                .lean()
                .exec( i.return( response, {
                    'returnData': function ( data ) {

                        var arrayBuffer = data[ 0 ].data.buffer
                        response.status( 200 ).end( arrayBuffer, 'binary' )

                    },
                    'afterAll':   function () {

                        console.timeEnd( timerLabel )

                    }
                } ))

        }

        /**
         * Allow to update data store in a specific cloud point
         *
         * @param request - The user request
         * @param response - The server response
         */
        function updateMeshesWithId ( request, response ) {

            console.log( 'updateMeshesWithId' )

            var meshId = __checkIdParam( 'id', request, response )
            Mesh.findById( meshId, i.return( response, {
                'returnData': function ( cloud ) {

                    // update model here

                    cloud.save( i.return( response ) );
                }
            } ) )

        }

        function deleteMeshesWithId ( request, response ) {

            console.log( 'deleteMeshesWithId' )

            var meshId = __checkIdParam( 'id', request, response )
            i.returnData( "deleteMeshesWithId: " + meshId, response )

        }

        // Return the public interface
        return {
            create: createMeshes,
            read:   readMeshes,
            readAll:   readAllMeshes,
            update: updateMeshes,
            delete: deleteMeshes,

            createOne: createMeshesWithId,
            readOne:   readMeshesWithId,
            updateOne: updateMeshesWithId,
            deleteOne: deleteMeshesWithId
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
module.exports = MeshesDatabaseController.getInstance()
