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

var PointCloud = require( 'mongoose' ).model( 'PointCloud' )
var i          = require( 'i-return' )

/**
 * This singleton module make easier the cloud point data routing from the database to the end user.
 * @type {{getInstance}}
 */
var PointCloudDatabaseController = (function () {

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
        function createPointClouds ( request, response ) {

            console.log( 'createPointClouds' )

            i.returnData( "createPointClouds: ...", response )

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
        var readPointCloudsRequestCounter = 0
        function readPointClouds ( request, response ) {

            var timerLabel = 'readPointClouds_' + readPointCloudsRequestCounter++
            console.time( timerLabel )

            PointCloud
                .find()
                .lean()
                .exec( i.return( response, {
                    'afterAll': function () {

                        console.timeEnd( timerLabel )

                    }
                } ) )

        }

        var updatePointCloudsRequestCounter = 0

        function updatePointClouds ( request, response ) {

            var timerLabel = 'updatePointClouds_' + updatePointCloudsRequestCounter++
            console.time( timerLabel )

            var samplingTable = request.body

            var ids = []
            for ( var key in samplingTable ) {
                ids.push( key )
            }

            PointCloud
                .find( {
                    '_id': { $in: ids }
                } )
                .lean()
                .exec( i.return( response, {
                    'returnData': function ( cubeDatas ) {

                        if ( cubeDatas.length === 0 ) { i.returnNotFound( response ) }
                        console.log( 'Number of cube data: ' + cubeDatas.length )

                        // console.log("Number of cube data: " + cubeDatas.length);
                        var cubeBuffers = cubeDatas.map( function ( cubeData ) {

                            var cubeId = cubeData._id.toString()

                            if ( !(cubeId in samplingTable) ) { return null }
                            var sampling = samplingTable[ cubeId ]
                            if ( sampling > 100 ) {
                                console.error( "Invalid sampling:" + sampling + " fallback to sampling 100" )
                                sampling = 100
                            }

                            var dataBuffer = cubeData.data.buffer
                            var bufferSize = dataBuffer.length
                            // console.log("bufferSize: " + bufferSize);

                            var idByteLength       = 24 // Bytes
                            var positionByteLength = 3 // Bytes
                            var headerSize         = idByteLength + positionByteLength

                            var numberOfPoints = (bufferSize - positionByteLength) / 6
                            // console.log("numberOfPoints: " + numberOfPoints);

                            var samplingPoints = Math.round( (numberOfPoints / 100) * sampling )
                            if ( samplingPoints === 0 ) { return null }

                            var arrayLength = headerSize + samplingPoints * 6
                            // console.log("arrayLength: " + arrayLength);

                            var tmpArray = new Uint8Array( arrayLength )
                            // Add id
                            for ( var charIndex = 0 ; charIndex < idByteLength ; ++charIndex ) {
                                tmpArray[ charIndex ] = cubeId.toString().charCodeAt( charIndex )
                            }
                            // Add cube position
                            tmpArray[ idByteLength ]     = dataBuffer.readUInt8( 0 )
                            tmpArray[ idByteLength + 1 ] = dataBuffer.readUInt8( 1 )
                            tmpArray[ idByteLength + 2 ] = dataBuffer.readUInt8( 2 )

                            // // Get random points in buffer
                            // var usedIndex    = [];
                            // var tmpIndex     = headerSize;
                            // var randomIndex  = 0;
                            // var bufferOffset = 0;
                            // while ( tmpIndex < arrayLength ) {
                            //
                            //     randomIndex = _getRandomInt(0, numberOfPoints - 1);
                            //     if ( usedIndex.indexOf(randomIndex) === -1 ) {
                            //
                            //         bufferOffset = numberOfPosition + randomIndex * 6;
                            //
                            //         // Position
                            //         tmpArray[ tmpIndex ]     = dataBuffer.readUInt8(bufferOffset);
                            //         tmpArray[ tmpIndex + 1 ] = dataBuffer.readUInt8(bufferOffset + 1);
                            //         tmpArray[ tmpIndex + 2 ] = dataBuffer.readUInt8(bufferOffset + 2);
                            //
                            //         // Color
                            //         tmpArray[ tmpIndex + 3 ] = dataBuffer.readUInt8(bufferOffset + 3);
                            //         tmpArray[ tmpIndex + 4 ] = dataBuffer.readUInt8(bufferOffset + 4);
                            //         tmpArray[ tmpIndex + 5 ] = dataBuffer.readUInt8(bufferOffset + 5);
                            //
                            //         tmpIndex += 6;
                            //     }
                            //
                            // }

                            var tmpIndex     = headerSize
                            var bufferOffset = 0
                            for ( var indexPointCube = 0 ; indexPointCube < samplingPoints ; indexPointCube++ ) {
                                bufferOffset = positionByteLength + indexPointCube * 6

                                // Position
                                tmpArray[ tmpIndex ]     = dataBuffer.readUInt8( bufferOffset )
                                tmpArray[ tmpIndex + 1 ] = dataBuffer.readUInt8( bufferOffset + 1 )
                                tmpArray[ tmpIndex + 2 ] = dataBuffer.readUInt8( bufferOffset + 2 )

                                // Color
                                tmpArray[ tmpIndex + 3 ] = dataBuffer.readUInt8( bufferOffset + 3 )
                                tmpArray[ tmpIndex + 4 ] = dataBuffer.readUInt8( bufferOffset + 4 )
                                tmpArray[ tmpIndex + 5 ] = dataBuffer.readUInt8( bufferOffset + 5 )

                                tmpIndex += 6
                            }

                            return Buffer.from( tmpArray )

                        } )

                        // Remove "empty" buffers
                        for ( var bufferIndex = cubeBuffers.length - 1 ; bufferIndex >= 0 ; bufferIndex-- ) {
                            if ( cubeBuffers[ bufferIndex ] === null ) {
                                cubeBuffers.splice( bufferIndex, 1 )
                            }
                        }

                        // If not buffer to process due to sampling just leave
                        var numberOfBuffer = cubeBuffers.length
                        if ( numberOfBuffer === 0 ) { response.status( 200 ).end() }
                        // console.log("numberOfBuffer: " + numberOfBuffer);

                        var sizeOfHeaderWithBufferSizes = 4 + (numberOfBuffer * 4) // numberOfBuffer(2 bytes) + arrayOfBufferSizes( numberOfBuffer * 4byte(1 int32) )
                        const dataCubeHeader            = Buffer.allocUnsafe( sizeOfHeaderWithBufferSizes ).fill( 0 )
                        dataCubeHeader.writeUInt32BE( numberOfBuffer, 0 )

                        var currentIndexBuffer = 4
                        var totalBufferLength  = sizeOfHeaderWithBufferSizes
                        for ( var cubeDataIndex = 0 ; cubeDataIndex < numberOfBuffer ; cubeDataIndex++ ) {
                            var cubeBufferLength = cubeBuffers[ cubeDataIndex ].length
                            // console.log("cubeBufferLength: " + cubeBufferLength);

                            dataCubeHeader.writeUInt32BE( cubeBufferLength, currentIndexBuffer )
                            // console.log(dataCubeHeader);

                            totalBufferLength += cubeBufferLength
                            currentIndexBuffer += 4
                        }

                        cubeBuffers.unshift( dataCubeHeader )

                        const dataCubeBuffer = Buffer.concat( cubeBuffers, totalBufferLength )
                        // console.log("dataCubeBuffer:");
                        // console.log(dataCubeBuffer);

                        response.status( 200 ).end( dataCubeBuffer, 'binary' )
                        // TODO need support for other type like binary
                        // i.returnData(dataCubeBuffer, response)

                    },
                    'afterAll':   function () {

                        console.timeEnd( timerLabel )

                    }
                } ) )

        }

        function deletePointClouds ( request, response ) {

            console.log( 'deletePointClouds' )

            i.returnData( "deletePointClouds: ...", response )

        }


        /**
         * Get a specific Cloud Point with given id
         *
         * @param request - The user request
         * @param response - The server response
         */
        var readPointCloudWithIdRequestCounter = 0
        function readPointCloudWithId ( request, response ) {

            var timerLabel = 'readPointCloudWithId_' + readPointCloudWithIdRequestCounter++
            console.time( timerLabel )

            var pointCloudId = __checkIdParam( 'pointCloudId', request, response )

            PointCloud.findById( pointCloudId, i.return( response, {
                'afterAll': function () {

                    console.timeEnd( timerLabel )

                }
            } ) )

        }

        /**
         * Allow to update data store in a specific cloud point
         *
         * @param request - The user request
         * @param response - The server response
         */
        var updatePointCloudWithIdRequestCounter = 0
        function updatePointCloudWithId ( request, response ) {

            var timerLabel = 'updatePointCloudWithId_' + updatePointCloudWithIdRequestCounter++
            console.time( timerLabel )

            var pointCloudId = __checkIdParam( 'pointCloudId', request, response )
            PointCloud.findById( pointCloudId, i.return( response, {
                'returnData': function ( cloud ) {

                    // update model here

                    cloud.save( i.return( response, {
                        'afterAll': function () {

                            console.timeEnd( timerLabel )

                        }
                    } ) )
                    
                }
            } ) )

        }

        function deletePointCloudWithId ( request, response ) {

            console.log( 'deletePointCloudWithId' )

            var pointCloudId = __checkIdParam( 'pointCloudId', request, response )
            i.returnData( "deletePointCloudWithId: " + pointCloudId, response )

        }

        // Return the public interface
        return {
            createPointClouds:      createPointClouds,
            readPointClouds:        readPointClouds,
            updatePointClouds:      updatePointClouds,
            deletePointClouds:      deletePointClouds,

            readPointCloudWithId:   readPointCloudWithId,
            updatePointCloudWithId: updatePointCloudWithId,
            deletePointCloudWithId: deletePointCloudWithId
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
module.exports = PointCloudDatabaseController.getInstance()
