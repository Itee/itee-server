/**
 * Created by Tristan on 07/03/2017.
 */

const readLine = require( 'readline' )
const fs       = require( 'fs' )

var _lineReader = null
var _cameraData = []

function _loadFileInMemory ( line, onError ) {



}

function _processFile ( onError ) {



}

/**
 * INTERFACE
 */
/**
 *
 * @param file
 */
function parseFile ( file, onSuccess, onError ) {

    var _onSuccess = onSuccess || function() { console.log( 'Successfully deleted ' + file ) }
    var _onError = onError || function( error ) { console.error( error ); }

    _lineReader = readLine.createInterface( {
        input: fs.createReadStream( file )
    } )

    _lineReader.on( 'line', function ( line ) {

        _loadFileInMemory( line, onError )

    } )

    _lineReader.on( 'close', function () {

        _processFile( onError )

    } )

    fs.unlink( file, function ( error ) {

        if ( error ) { onError( error ) }

        _onSuccess()

    } )
    
}

module.exports = {
    parse: parseFile
}
