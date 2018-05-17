/**
 * Created by tvalcke on 29/09/2016.
 */

var CloudPoint           = require("mongoose").model('CloudPoint'),
    CubeDataPoint        = require("mongoose").model('CubeDataPoint'),
    i                    = require('./ReturnModule'),
    CloudPointController = (function() {

        var _instance = null;

        // Constructor
        function createInstance() {

            /**
             * PRIVATE METHODS
             */
            function __checkData( dataName, request, response ) {

                if ( !request.body && !request.params && !request.query ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'Aucun paramètre n\'a été reçu !'
                    }, response);
                }

                if ( request.body[ dataName ] ) {
                    return request.body[ dataName ];
                } else if ( request.params[ dataName ] ) {
                    return request.params[ dataName ];
                } else if ( request.query[ dataName ] ) {
                    return request.query[ dataName ];
                } else {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: dataName + " n'existe pas dans les paramètres !"
                    }, response);
                }

            }

            function __checkIdParam( idName, request, response ) {

                if ( !request.params ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'Aucun paramètre n\'a été reçu !'
                    }, response);
                }
                if ( !request.params[ idName ] ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'L\'id  est null !'
                    }, response);
                }

                return request.params[ idName ];

            }

            function __checkBodyData( idName, request, response ) {

                if ( !request.body ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'Aucun paramètre n\'a été reçu !'
                    }, response);
                }

                if ( !request.body[ idName ] ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'L\'id  est null !'
                    }, response);
                }

                return request.body[ idName ];

            }

            /**
             * Returns a random integer between min (inclusive) and max (inclusive)
             * Using Math.round() will give you a non-uniform distribution!
             */
            function _getRandomInt( min, max ) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            /**
             * REST API
             */
            function getAllCloudPoint( request, response ) {

                console.log("getAllCloudPoint");

                // console.log("request:");
                // console.log(request);

                console.log("body:");
                console.log(request.body);

                console.log("params:");
                console.log(request.params);

                console.log("query:");
                console.log(request.query);


                CloudPoint.find(i.return(response, {
                    'returnData': function( clouds ) {

                        var wrappedData = {
                            Items: clouds
                        };

                        console.log("returnData:");
                        console.log(wrappedData);

                        i.returnData(wrappedData, response);

                    },
                    'returnNotFound': function() {
                        var wrappedData = {
                            Items: []
                        };

                        console.log("returnNotFound:");
                        console.log(wrappedData);

                        i.returnData(wrappedData, response);
                    }
                }));
            }

            function getCloudWithId( request, response ) {

                console.log("getCloudWithId");

                var cloudId = __checkIdParam('cloudId', request, response);
                CloudPoint.findById(cloudId, i.return(response));

            }

            function getCubePointMultiSampled( request, response ) {

                console.log("getCubePointMultiSampled");

                var cloudId  = __checkIdParam('cloudId', request, response);
                var bodyData = request.body;

                CloudPoint.findById(cloudId, i.return(response, {
                    'returnData': function( cloud ) {

                        var samplingHash = {};

                        for ( var property in bodyData ) {
                            if ( bodyData.hasOwnProperty(property) ) {

                                var ids         = bodyData[ property ];
                                var splittedIds = ids.split(',').filter(function( el ) {
                                    return el.length != 0
                                });

                                for ( var idIndex = 0, numberOfIds = splittedIds.length ; idIndex < numberOfIds ; ++idIndex ) {
                                    samplingHash[ splittedIds[ idIndex ] ] = parseInt(property);
                                }

                            }
                        }

                        CubeDataPoint.find(function( error, cubeDatas ) {

                            if ( cubeDatas ) {

                                console.log("Number of cube data: " + cubeDatas.length);
                                var cubeBuffers = cubeDatas.map(function( cubeData ) {

                                    var cubeId = cubeData._id;

                                    if ( cubeId in samplingHash ) {

                                        var sampling = samplingHash[ cubeId ] / 100;
                                        console.log("sampling:" + sampling);

                                        // if ( sampling >= 100.0 ) {
                                        //
                                        //     return cubeData.data;
                                        //
                                        // } else {

                                            var dataBuffer = cubeData.data;
                                            var bufferSize = dataBuffer.length;
                                            //console.log("bufferSize: " + bufferSize);

                                            var idByteLength       = 24; // Bytes
                                            var positionByteLength = 3; // Bytes
                                            var headerSize         = idByteLength + positionByteLength;

                                            var numberOfPoints = (bufferSize - positionByteLength) / 6;
                                            //console.log("numberOfPoints: " + numberOfPoints);

                                            var samplingPoints = Math.round((numberOfPoints / 100) * sampling);
                                            //console.log("samplingPoints: " + samplingPoints);
                                            if ( samplingPoints === 0 ) {
                                                // console.log("");
                                                return null;
                                            }

                                            var arrayLength = headerSize + samplingPoints * 6;
                                            //console.log("arrayLength: " + arrayLength);

                                            var tmpArray = new Uint8Array(arrayLength);
                                            // Add id
                                            for ( var charIndex = 0 ; charIndex < idByteLength ; ++charIndex ) {
                                                tmpArray[ charIndex ] = cubeId.toString().charCodeAt(charIndex);
                                            }
                                            // Add cube position
                                            tmpArray[ idByteLength ]     = dataBuffer.readUInt8(0);
                                            tmpArray[ idByteLength + 1 ] = dataBuffer.readUInt8(1);
                                            tmpArray[ idByteLength + 2 ] = dataBuffer.readUInt8(2);

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
                                            //         bufferOffset = positionByteLength + randomIndex * 6;
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

                                            var tmpIndex = headerSize;
                                            var bufferOffset = 0;
                                            for ( var indexPointCube = 0 ; indexPointCube < samplingPoints ; indexPointCube++ ) {

                                                bufferOffset = positionByteLength + indexPointCube * 6;

                                                // Position
                                                tmpArray[ tmpIndex ]     = dataBuffer.readUInt8(bufferOffset);
                                                tmpArray[ tmpIndex + 1 ] = dataBuffer.readUInt8(bufferOffset + 1);
                                                tmpArray[ tmpIndex + 2 ] = dataBuffer.readUInt8(bufferOffset + 2);

                                                // Color
                                                tmpArray[ tmpIndex + 3 ] = dataBuffer.readUInt8(bufferOffset + 3);
                                                tmpArray[ tmpIndex + 4 ] = dataBuffer.readUInt8(bufferOffset + 4);
                                                tmpArray[ tmpIndex + 5 ] = dataBuffer.readUInt8(bufferOffset + 5);

                                                tmpIndex += 6;
                                            }

                                            return Buffer.from(tmpArray);
                                        // }

                                    } else {
                                        return null;
                                    }

                                });

                                // Remove "empty" buffers
                                for ( var bufferIndex = cubeBuffers.length - 1 ; bufferIndex >= 0 ; bufferIndex-- ) {
                                    if ( cubeBuffers[ bufferIndex ] === null ) {
                                        cubeBuffers.splice(bufferIndex, 1);
                                    }
                                }

                                var numberOfBuffer = cubeBuffers.length;
                                console.log("numberOfBuffer: " + numberOfBuffer);

                                var sizeOfHeaderWithBufferSizes = 4 + (numberOfBuffer * 4); // numberOfBuffer(2 bytes) + arrayOfBufferSizes( numberOfBuffer * 4byte(1 int32) )
                                const dataCubeHeader            = Buffer.allocUnsafe(sizeOfHeaderWithBufferSizes).fill(0);
                                dataCubeHeader.writeUInt32BE(numberOfBuffer, 0);

                                var currentIndexBuffer = 4;
                                var totalBufferLength  = sizeOfHeaderWithBufferSizes;
                                for ( var cubeDataIndex = 0 ; cubeDataIndex < numberOfBuffer ; cubeDataIndex++ ) {

                                    var cubeBufferLength = cubeBuffers[ cubeDataIndex ].length;
                                    // console.log("cubeBufferLength: " + cubeBufferLength);

                                    dataCubeHeader.writeUInt32BE(cubeBufferLength, currentIndexBuffer);
                                    // console.log(dataCubeHeader);

                                    totalBufferLength += cubeBufferLength;
                                    currentIndexBuffer += 4;
                                }

                                cubeBuffers.unshift(dataCubeHeader);

                                const dataCubeBuffer = Buffer.concat(cubeBuffers, totalBufferLength);
                                // console.log("dataCubeBuffer:");
                                // console.log(dataCubeBuffer);

                                response.status(200).end(dataCubeBuffer, 'binary');

                            } else {
                                response.status(204).end();
                            }

                        });

                    }
                }));


            }

            function getAllCubePointForCloudWithId( request, response ) {

                console.log("getAllCubePointForCloudWithId");

                // console.log("body:");
                // console.log(request.body);
                //
                // console.log("params:");
                // console.log(request.params);
                //
                // console.log("query:");
                // console.log(request.query);

                var ids      = [];
                var cloudId  = __checkIdParam('cloudId', request, response);
                var sampling = __checkData('sampling', request, response);

                sampling = sampling / 10;
                //console.log("cloudId:");
                //console.log(cloudId);
                //
                //console.log("sampling:");
                //console.log(sampling);
                //
                //console.log("ids:");
                //console.log(ids);

                CloudPoint.findById(cloudId, i.return(response, {
                    'returnData': function( cloud ) {

                        if ( request.body.cubeIds ) {
                            ids = request.body.cubeIds;
                        } else {
                            ids = cloud.cube_data_point.map(function( cubeDataPoint ) {
                                return cubeDataPoint.id;
                            })
                        }

                        CubeDataPoint.find({
                            '_id': {$in: ids}
                        }, function( error, cubeDatas ) {

                            if ( cubeDatas ) {

                                console.log("Number of cube data: " + cubeDatas.length);
                                var cubeBuffers = cubeDatas.map(function( cubeData ) {

                                    var cubeId = cubeData._id;

                                    if ( sampling >= 100.0 ) {

                                        return cubeData.data;

                                    } else {

                                        var dataBuffer = cubeData.data;
                                        var bufferSize = dataBuffer.length;
                                        //console.log("bufferSize: " + bufferSize);

                                        var idByteLength       = 24; // Bytes
                                        var positionByteLength = 3; // Bytes
                                        var headerSize         = idByteLength + positionByteLength;

                                        var numberOfPoints = (bufferSize - positionByteLength) / 6;
                                        // console.log("numberOfPoints: " + numberOfPoints);

                                        var samplingPoints = Math.round((numberOfPoints / 100) * sampling);
                                        // console.log("samplingPoints: " + samplingPoints);
                                        if ( samplingPoints === 0 ) {
                                            // console.log("");
                                            return null;
                                        }

                                        var arrayLength = headerSize + samplingPoints * 6;
                                        //console.log("arrayLength: " + arrayLength);

                                        var tmpArray = new Uint8Array(arrayLength);
                                        // Add id
                                        for ( var charIndex = 0 ; charIndex < idByteLength ; ++charIndex ) {
                                            tmpArray[ charIndex ] = cubeId.toString().charCodeAt(charIndex);
                                        }
                                        // Add cube position
                                        tmpArray[ idByteLength ]     = dataBuffer.readUInt8(0);
                                        tmpArray[ idByteLength + 1 ] = dataBuffer.readUInt8(1);
                                        tmpArray[ idByteLength + 2 ] = dataBuffer.readUInt8(2);

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
                                        //         bufferOffset = positionByteLength + randomIndex * 6;
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

                                        var tmpIndex = headerSize;
                                        var bufferOffset = 0;
                                        for ( var indexPointCube = 0 ; indexPointCube < samplingPoints ; indexPointCube++ ) {

                                            bufferOffset = positionByteLength + indexPointCube * 6;

                                            // Position
                                            tmpArray[ tmpIndex ]     = dataBuffer.readUInt8(bufferOffset);
                                            tmpArray[ tmpIndex + 1 ] = dataBuffer.readUInt8(bufferOffset + 1);
                                            tmpArray[ tmpIndex + 2 ] = dataBuffer.readUInt8(bufferOffset + 2);

                                            // Color
                                            tmpArray[ tmpIndex + 3 ] = dataBuffer.readUInt8(bufferOffset + 3);
                                            tmpArray[ tmpIndex + 4 ] = dataBuffer.readUInt8(bufferOffset + 4);
                                            tmpArray[ tmpIndex + 5 ] = dataBuffer.readUInt8(bufferOffset + 5);

                                            tmpIndex += 6;
                                        }

                                        return Buffer.from(tmpArray);
                                    }

                                });

                                // Remove "empty" buffers
                                for ( var bufferIndex = cubeBuffers.length - 1 ; bufferIndex >= 0 ; bufferIndex-- ) {
                                    if ( cubeBuffers[ bufferIndex ] === null ) {
                                        cubeBuffers.splice(bufferIndex, 1);
                                    }
                                }

                                var numberOfBuffer = cubeBuffers.length;
                                console.log("numberOfBuffer: " + numberOfBuffer);

                                var sizeOfHeaderWithBufferSizes = 4 + (numberOfBuffer * 4); // numberOfBuffer(2 bytes) + arrayOfBufferSizes( numberOfBuffer * 4byte(1 int32) )
                                const dataCubeHeader            = Buffer.allocUnsafe(sizeOfHeaderWithBufferSizes).fill(0);
                                dataCubeHeader.writeUInt32BE(numberOfBuffer, 0);

                                var currentIndexBuffer = 4;
                                var totalBufferLength  = sizeOfHeaderWithBufferSizes;
                                for ( var cubeDataIndex = 0 ; cubeDataIndex < numberOfBuffer ; cubeDataIndex++ ) {

                                    var cubeBufferLength = cubeBuffers[ cubeDataIndex ].length;
                                    // console.log("cubeBufferLength: " + cubeBufferLength);

                                    dataCubeHeader.writeUInt32BE(cubeBufferLength, currentIndexBuffer);
                                    // console.log(dataCubeHeader);

                                    totalBufferLength += cubeBufferLength;
                                    currentIndexBuffer += 4;
                                }

                                cubeBuffers.unshift(dataCubeHeader);

                                const dataCubeBuffer = Buffer.concat(cubeBuffers, totalBufferLength);
                                // console.log("dataCubeBuffer:");
                                // console.log(dataCubeBuffer);

                                response.status(200).end(dataCubeBuffer, 'binary');

                            } else {
                                response.status(204).end();
                            }

                        });

                    }
                }));

            }

            function getCubePointWithIdForCloudWithId( request, response ) {

                console.log("getCubePointWithIdForCloudWithId");

                var cloudId = __checkIdParam('cloudId', request, response);
                var cubeId  = __checkIdParam('cubeId', request, response);

                CloudPoint.findById(cloudId, i.return(response, {
                    'returnData': function( cloud ) {

                        //CubeDataPoint.findById(cubeId, i.return(response));

                        CubeDataPoint.findById(cubeId, i.return(response, {
                            'returnData': function( cubeData ) {

                                //console.log(response);
                                //console.log(cubeData.data);
                                //console.log(" ");

                                response
                                    .status(200)
                                    .end(cubeData.data, 'binary');

                            }
                        }));

                    }
                }));
            }

            // Return the public interface
            return {
                getAllCloudPoint:                 getAllCloudPoint,
                getCloudWithId:                   getCloudWithId,
                getAllCubePointForCloudWithId:    getAllCubePointForCloudWithId,
                getCubePointWithIdForCloudWithId: getCubePointWithIdForCloudWithId,
                getCubePointMultiSampled:         getCubePointMultiSampled
            };
        }

        return {
            getInstance: function() {
                if ( !_instance ) {
                    _instance = createInstance();
                }
                return _instance;
            }
        };

    })();

module.exports = CloudPointController.getInstance();
