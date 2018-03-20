/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

const fs           = require( 'fs' )
const { Writable } = require( 'stream' )

////////

/* Writable memory stream */
class MemoryWriteStream extends Writable {

    constructor ( options ) {

        super( options )

        this.memoryBuffer = new Buffer( '' )

    }

    _write ( chunk, encoding, callback ) {

        // our memory store stores things in buffers
        const buffer            = (Buffer.isBuffer( chunk )) ? chunk : new Buffer( chunk, encoding )
        const finalBufferLength = this.memoryBuffer.length + buffer.length

        // concat to the buffer already there
        this.memoryBuffer = Buffer.concat( [ this.memoryBuffer, buffer ], finalBufferLength )

        // Next
        callback()

    }

    _writev ( chunks, callback ) {

        for ( let chunkIndex = 0, numberOfChunks = chunks.length ; chunkIndex < numberOfChunks ; chunkIndex++ ) {
            this.memoryBuffer = Buffer.concat( [ this.memoryBuffer, chunks[ chunkIndex ] ] )
        }

        // Next
        callback()

    }

    _final ( callback ) {

        callback()

    }

    _releaseMemory () {

        this.memoryBuffer = new Buffer( '' )

    }

    ////

    toArrayBuffer () {

        const buffer      = this.memoryBuffer
        const arrayBuffer = new ArrayBuffer( buffer.length )
        const view        = new Uint8Array( arrayBuffer )

        for ( let i = 0 ; i < buffer.length ; ++i ) {
            view[ i ] = buffer[ i ]
        }

        this._releaseMemory()

        return arrayBuffer

    }

    toString () {

        const string = this.memoryBuffer.toString()
        this._releaseMemory()

        return string

    }

    toJSON () {

        const json = JSON.parse( this.memoryBuffer.toString() )
        this._releaseMemory()

        return json
    }

}

////////

function FileToThreeBase () {
    'use strict'

    this.dumpType = 'arraybuffer' // 'string', 'json'

    this._isProcessing = false
    this._filesQueue   = []
    this._fileData     = undefined
//  this._fileSize = fs.statSync( file.file ).size

}

FileToThreeBase.MAX_FILE_SIZE = 67108864

FileToThreeBase.prototype.convert = function convert ( file, parameters, onSuccess, onProgress, onError ) {

    this._filesQueue.push( {
        file,
        parameters,
        onSuccess,
        onProgress,
        onError
    } )

    if ( !this._isProcessing ) {
        this._processQueue()
    }

}

FileToThreeBase.prototype._processQueue = function _processQueue () {

    if ( this._filesQueue.length > 0 ) {

        this._isProcessing = true

        const self              = this
        const fileData          = this._filesQueue.shift()
        const currentFile       = fileData.file
        const currentParameters = fileData.parameters
        const currentOnSuccess  = fileData.onSuccess
        const currentOnProgress = fileData.onProgress
        const currentOnError    = fileData.onError

        self._dumpFileInMemoryAs(
            this.dumpType,
            currentFile,
            currentParameters,
            _onDumpSuccess,
            _onProcessProgress,
            _onProcessError
        )

        function _onDumpSuccess ( data ) {

            self._fileData = data
            self._convert(
                currentParameters,
                _onProcessSuccess,
                _onProcessProgress,
                _onProcessError
            )

        }

        function _onProcessSuccess ( threeData ) {

            self._releaseMemory()
            currentOnSuccess( threeData )
            self._processQueue()

        }

        function _onProcessProgress ( progress ) {

            currentOnProgress( progress )

        }

        function _onProcessError ( error ) {

            currentOnError( error )
            self._processQueue()

        }

    } else {

        this._isProcessing = false

    }

}

FileToThreeBase.prototype._dumpFileInMemoryAs = function ( dumpType, file, parameters, onSuccess, onProgress, onError ) {
    'use strict'

    let isOnError = false

    const fileReadStream = fs.createReadStream( file )

    fileReadStream.on( 'error', ( error ) => {
        console.error( `Read stream on error: ${error}` )

        isOnError = true
        onError( error )

    } )

    const memoryWriteStream = new MemoryWriteStream()

    memoryWriteStream.on( 'error', ( error ) => {
        console.log( `Memory write stream on error: ${error}` )

        isOnError = true
        onError( error )

    } )

    memoryWriteStream.on( 'finish', () => {
        console.log( 'Memory write stream on finish' )

        if ( isOnError ) {
            return
        }

        switch ( dumpType ) {

            case 'arraybuffer':
                onSuccess( memoryWriteStream.toArrayBuffer() )
                break

            case 'string':
                onSuccess( memoryWriteStream.toString() )
                break

            case 'json':
                onSuccess( memoryWriteStream.toJSON() )
                break

            default:
                throw new RangeError( `Invalid switch parameter: ${dumpType}` )
                break

        }

    } )

    fileReadStream.pipe( memoryWriteStream )

}

FileToThreeBase.prototype._releaseMemory = function _releaseMemory () {

    this._fileData = ''

}

FileToThreeBase.prototype._convert = function _convert ( parameters, onSuccess, onProgress, onError ) {

    console.error( '_convert: Need to be reimplemented in inherited class !' )

}

module.exports = FileToThreeBase
