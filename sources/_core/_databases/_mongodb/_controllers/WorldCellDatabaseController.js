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

var WorldCell  = require( 'mongoose' ).model( 'WorldCell' )
var PointCloud = require( 'mongoose' ).model( 'PointCloud' )
var i          = require( 'i-return' )

/**
 * This singleton module make easier the cloud point data routing from the database to the end user.
 * @type {{getInstance}}
 */
var WorldCellDatabaseController = (function () {
    
    var _instance = null

    /**
     * Return the WorldCellDatabaseController interface
     * @returns {{getAllCloudPoint: getAllWorldCells, getCloudWithId: getWorldCellWithId, getAllCubePointForCloudWithId: getAllPointCloudForWorldCellWithId, getCubePointWithIdForCloudWithId:
     *     getPointCloudWithIdForWorldCellWithId, getCubePointMultiSampled: getPointCloudMultiSampled}}
     */
    function createInstance () {
        /*
         * PRIVATE METHODS
         */

        /**
         * Check if requested params named 'dataName' exist in request.body, request.params or request.query
         *
         * @param dataName - The property name to looking for
         * @param request - The _server request
         * @param response - The _server response
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
         * @param request - The _server request
         * @param response - The _server response
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
         * @param request - The _server request
         * @param response - The _server response
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
        /**
         * The method will ask the database to find all the cloudpoints,
         * it will wrap database result in a object like:
         *
         * {
         *     Items: clouds
         * }
         *
         * @param request - The user request
         * @param response - The _server response
         */
        var getAllWorldCellsRequestCounter = 0

        function getAllWorldCells ( request, response ) {

            var timerLabel = 'getAllWorldCells_' + getAllWorldCellsRequestCounter++
            console.time( timerLabel )

            WorldCell
                .find()
                .lean()
                .exec( i.return( response, {
                    'afterAll': function () {

                        console.timeEnd( timerLabel )

                    }
                } ) )

        }

        /**
         * Get a specific Cloud Point with given id
         *
         * @param request - The user request
         * @param response - The _server response
         */
        function getWorldCellWithId ( request, response ) {
            console.log( 'getWorldCellWithId' )

            var cloudId = __checkIdParam( 'cloudId', request, response )
            WorldCell.findById( cloudId, i.return( response ) )
        }

        /**
         * Allow to update data store in a specific cloud point
         *
         * @param request - The user request
         * @param response - The _server response
         */
        function updateWorldCellWithId ( request, response ) {

            var cloudId = __checkIdParam( 'cloudId', request, response )
            WorldCell.findById( cloudId, i.return( response, {
                'returnData': function ( cloud ) {
                    cloud.cameraPath = [
                        {
                            coordinates: {
                                x: 1.0,
                                y: 2.0,
                                z: 3.0
                            },
                            images:      []
                        }
                    ]

                    cloud.save( i.return( response ) );
                }
            } ) )

        }

        var getAllMeshesRequestCounter = 0 
        function getAllMeshes( request, response ) {


            var timerLabel = 'getAllMeshes_' + getAllMeshesRequestCounter++
            console.time( timerLabel )

            WorldCell
                .find()
                .lean()
                .exec( i.return( response, {
                    'returnData': function ( worldCells ) {

                        var meshesDatas = worldCells.map( function ( worldCell ) {

                            return worldCell.meshes[0]

                        } )

                        // Remove "empty" meshes
                        for ( var meshIndex = meshesDatas.length - 1 ; meshIndex >= 0 ; meshIndex-- ) {
                            if ( ! meshesDatas[ meshIndex ] ) {
                                meshesDatas.splice( meshIndex, 1 )
                            }
                        }

                        i.returnData(meshesDatas, response)

                    },
                    'afterAll': function () {

                        console.timeEnd( timerLabel )

                    }
                } ) )

//            WorldCell.find( i.return( response, {
//                'returnData': function ( worldCells ) {
//
//                    var meshesDatas = worldCells.map( function ( worldCell ) {
//
//                        return worldCell.meshes[0]
//
//                    } )
//
//                    // Remove "empty" meshes
//                    for ( var meshIndex = meshesDatas.length - 1 ; meshIndex >= 0 ; meshIndex-- ) {
//                        if ( ! meshesDatas[ meshIndex ] ) {
//                            meshesDatas.splice( meshIndex, 1 )
//                        }
//                    }
//
//                    i.returnData(meshesDatas, response)
//
//                },
//                'afterAll': function () {
//
//                    console.timeEnd( timerLabel )
//
//                }
//            } ) )

        }

        /**
         * Get the data cube for the WorldCell with given id, applying the given sampling hash.
         *
         * @param request - The user request
         * @param response - The _server response
         */
        var getPointCloudMultiSampledRequestCounter = 0
        function getPointCloudMultiSampled ( request, response ) {

            var timerLabel = 'getPointCloudMultiSampled_' + getPointCloudMultiSampledRequestCounter++
            console.time( timerLabel )

            var cloudId  = __checkIdParam( 'cloudId', request, response )
            var bodyData = request.body

            WorldCell.findById( cloudId, i.return( response, {
                'returnData': function ( cloud ) {
                    var samplingHash = {}

                    var allIds = []
                    for ( var property in bodyData ) {

                        if ( bodyData.hasOwnProperty( property ) ) {

                            var ids = bodyData[ property ]
                            Array.prototype.push.apply( allIds, ids );

                            for ( var idIndex = 0, numberOfIds = ids.length ; idIndex < numberOfIds ; ++idIndex ) {
                                samplingHash[ ids[ idIndex ] ] = parseInt( property )
                            }

                        }
                    }

                    PointCloud.find( {
                        '_id': { $in: allIds }
                    }, i.return( response, {
                        'returnData': function ( cubeDatas ) {

                            if ( cubeDatas.length === 0 ) { i.returnNotFound( response ) }
                            console.log( 'Number of cube data: ' + cubeDatas.length )

                            // console.log("Number of cube data: " + cubeDatas.length);
                            var cubeBuffers = cubeDatas.map( function ( cubeData ) {

                                var cubeId = cubeData._id

                                if ( !(cubeId in samplingHash) ) { return null }

                                var sampling = samplingHash[ cubeId ]
                                // console.log("sampling:" + sampling);

                                var dataBuffer = cubeData.data
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
                        'afterAll': function () {

                            console.timeEnd( timerLabel )

                        }
                    } ) )

                }
            } ) )
        }

        /**
         * Get all data cube point with given ids for the Cloud Point with given id,
         * an concat into a single buffer all the data cube.
         *
         * @param request - The user request
         * @param response - The _server response
         */

        var getAllPointCloudForWorldCellWithIdRequestCounter = 0

        function getAllPointCloudForWorldCellWithId ( request, response ) {

            var timerLabel = 'getAllPointCloudForWorldCellWithId_' + getAllPointCloudForWorldCellWithIdRequestCounter++
            console.time( timerLabel )

            var ids      = []
            var cloudId  = __checkIdParam( 'cloudId', request, response )
            var sampling = __checkData( 'sampling', request, response )

            WorldCell.findById( cloudId, i.return( response, {

                'returnData': function ( cloud ) {

                    if ( request.body.cubeIds ) {

                        ids = request.body.cubeIds

                    } else {

                        ids = cloud.cubeDataPoint.map( function ( cubeDataPoint ) {
                            return cubeDataPoint.id
                        } )

                    }

                    //TODO: Create a buffer concatener

                    PointCloud.find( {
                        '_id': { $in: ids }
                    }, i.return( response, {
                        'returnData': function ( cubeDatas ) {

                            if ( cubeDatas.length === 0 ) { i.returnNotFound( response ) }
                            console.log( 'Number of cube data: ' + cubeDatas.length )

                            var cubeBuffers = cubeDatas.map( function ( cubeData ) {

                                var cubeId = cubeData._id

                                //TODO: make special case for sampling = 100%

                                var dataBuffer = cubeData.data
                                var bufferSize = dataBuffer.length
                                // console.log("bufferSize: " + bufferSize);

                                const CUBE_ID_BYTES_LENGTH        = 24
                                const CUBE_POSITION_BYTES_LENGTH  = 3
                                const HEADER_SIZE                 = CUBE_ID_BYTES_LENGTH + CUBE_POSITION_BYTES_LENGTH
                                const POINT_POSITION_BYTES_LENGTH = 3
                                const POINT_COLOR_BYTES_LENGTH    = 3
                                const POINT_DATA_BYTES_LENGTH     = POINT_POSITION_BYTES_LENGTH + POINT_COLOR_BYTES_LENGTH

                                var numberOfPoints = (bufferSize - CUBE_POSITION_BYTES_LENGTH) / POINT_DATA_BYTES_LENGTH
                                // console.log("numberOfPoints: " + numberOfPoints);

                                var samplingPoints = Math.round( (numberOfPoints / 100) * sampling )
                                if ( samplingPoints === 0 ) { return null }

                                var arrayLength = HEADER_SIZE + samplingPoints * POINT_DATA_BYTES_LENGTH

                                var tmpArray = new Uint8Array( arrayLength )

                                // Add id
                                for ( var charIndex = 0 ; charIndex < CUBE_ID_BYTES_LENGTH ; ++charIndex ) {
                                    tmpArray[ charIndex ] = cubeId.toString().charCodeAt( charIndex )
                                }

                                // Add cube position
                                tmpArray[ CUBE_ID_BYTES_LENGTH ]     = dataBuffer.readUInt8( 0 )
                                tmpArray[ CUBE_ID_BYTES_LENGTH + 1 ] = dataBuffer.readUInt8( 1 )
                                tmpArray[ CUBE_ID_BYTES_LENGTH + 2 ] = dataBuffer.readUInt8( 2 )

                                // Todo: special case for sampling 100%
                                // Fill buffer with sampled points
                                var tmpIndex     = HEADER_SIZE
                                var bufferOffset = 0
                                for ( var indexPointCube = 0 ; indexPointCube < samplingPoints ; indexPointCube++ ) {

                                    bufferOffset = CUBE_POSITION_BYTES_LENGTH + indexPointCube * POINT_DATA_BYTES_LENGTH

                                    // Position
                                    tmpArray[ tmpIndex ]     = dataBuffer.readUInt8( bufferOffset )
                                    tmpArray[ tmpIndex + 1 ] = dataBuffer.readUInt8( bufferOffset + 1 )
                                    tmpArray[ tmpIndex + 2 ] = dataBuffer.readUInt8( bufferOffset + 2 )

                                    // Color
                                    tmpArray[ tmpIndex + 3 ] = dataBuffer.readUInt8( bufferOffset + 3 )
                                    tmpArray[ tmpIndex + 4 ] = dataBuffer.readUInt8( bufferOffset + 4 )
                                    tmpArray[ tmpIndex + 5 ] = dataBuffer.readUInt8( bufferOffset + 5 )

                                    tmpIndex += POINT_DATA_BYTES_LENGTH

                                }

                                return Buffer.from( tmpArray )

                            } )

                            // Remove "empty" buffers ( means number of sampled point = 0 )
                            for ( var bufferIndex = cubeBuffers.length - 1 ; bufferIndex >= 0 ; bufferIndex-- ) {
                                if ( cubeBuffers[ bufferIndex ] === null ) {
                                    cubeBuffers.splice( bufferIndex, 1 )
                                }
                            }

                            // Concat all sampled buffer into one !
                            var numberOfBuffer = cubeBuffers.length
                            if ( numberOfBuffer === 0 ) { response.status( 200 ).end() }
                            console.log( 'numberOfBuffer: ' + numberOfBuffer )

                            const NUMBER_OF_BUFFER_VALUE_BYTES_LENGTH = 4 // UInt32
                            const SIZES_OF_BUFFER_ARRAY_BYTES_LENGTH  = (numberOfBuffer * 4) // UInt32
                            var sizeOfHeaderWithBufferSizes           = NUMBER_OF_BUFFER_VALUE_BYTES_LENGTH + SIZES_OF_BUFFER_ARRAY_BYTES_LENGTH
                            const dataCubeHeader                      = Buffer.allocUnsafe( sizeOfHeaderWithBufferSizes ).fill( 0 )
                            dataCubeHeader.writeUInt32BE( numberOfBuffer, 0 )

                            // Create array of buffer length
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
            } ) )
        }

        /**
         * Get a cube data point with given id for a WorldCell with given id
         *
         * @param request - The user request
         * @param response - The _server response
         */
        var getPointCloudWithIdForWorldCellWithIdRequestCounter = 0
        function getPointCloudWithIdForWorldCellWithId ( request, response ) {

            var timerLabel = 'getPointCloudWithIdForWorldCellWithId_' + getPointCloudWithIdForWorldCellWithIdRequestCounter++
            console.time( timerLabel )

            var cloudId = __checkIdParam( 'cloudId', request, response )
            var cubeId  = __checkIdParam( 'cubeId', request, response )

            WorldCell.findById( cloudId, i.return( response, {
                'returnData': function ( cloud ) {
                    // PointCloud.findById(cubeId, i.return(response));

                    PointCloud.findById( cubeId, i.return( response, {
                        'returnData': function ( cubeData ) {
                            // console.log(response);
                            // console.log(cubeData.data);
                            // console.log(" ");

                            response
                                .status( 200 )
                                .end( cubeData.data, 'binary' )
                        }
                    } ) )
                },
                'afterAll':   function () {

                    console.timeEnd( timerLabel )

                }
            } ) )
        }

        // Return the public interface
        return {
            getPointClouds:                        getAllWorldCells,
            getAllMeshes:                             getAllMeshes,
            getWorldCellWithId:                    getWorldCellWithId,
            updateWorldCellWithId:                 updateWorldCellWithId,
            getAllPointCloudForWorldCellWithId:    getAllPointCloudForWorldCellWithId,
            getPointCloudWithIdForWorldCellWithId: getPointCloudWithIdForWorldCellWithId,
            getPointCloudMultiSampled:             getPointCloudMultiSampled
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
module.exports = WorldCellDatabaseController.getInstance()
