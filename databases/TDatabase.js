/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module TDatabase
 *
 * @description This module manage the mongoose database driver extention.
 * It will extend with external plugins (like 'mongoose-double'),
 * local schema and finally apply the ReconnectDatabase module.
 *
 */
const fs             = require( 'fs' )
const path           = require( 'path' )
const mongooseDouble = require( 'mongoose-double' )
const autoReconnect  = require( './TAutoReconnect' )
let mongoose         = require( 'mongoose' )

/**
 * Just an override of 'fs.existsSync' with more explicit name
 *
 * @param filePath the path to check
 * @private
 */
function _fileExistForPath ( filePath ) {

    return fs.existsSync( filePath )

}

/**
 * Allow to search all files under filePaths in a recursive way
 *
 * @param {Array.<string>|string} filePaths - The files paths where search files
 * @returns {Array} - The paths of finded files
 * @private
 */
function _getFilesPathsUnder ( filePaths ) {

    let files = []

    if ( Array.isArray( filePaths ) ) {

        let filePath = undefined
        for ( let pathIndex = 0, numberOfPaths = filePaths.length ; pathIndex < numberOfPaths ; pathIndex++ ) {

            filePath = filePaths[ pathIndex ]
            checkStateOf( filePath )

        }

    } else {

        checkStateOf( filePaths )

    }

    return files

    function getFilesPathsUnderFolder ( folder ) {

        fs.readdirSync( folder ).forEach( ( name ) => {

            const filePath = path.resolve( folder, name )
            checkStateOf( filePath )

        } )

    }

    function checkStateOf ( filePath ) {

        if ( !_fileExistForPath( filePath ) ) {
            console.error( 'SchemaRegister: Invalid file path "' + filePath + '"' )
            return
        }

        const stats = fs.statSync( filePath )
        if ( stats.isFile() ) {

            files.push( filePath )

        } else if ( stats.isDirectory() ) {

            Array.prototype.push.apply( files, getFilesPathsUnderFolder( filePath ) )

        } else {

            console.error( "Invalid stat object !" )

        }

    }

}

/**
 * This module manage the mongoose database driver extention.
 * It will extend with external plugins (like 'mongoose-double'),
 * local schema and finally apply the ReconnectDatabase module.
 *
 * @param mongoose - The mongoose driver database to extend
 * @returns {*} - The extended mongoose driver
 */
module.exports = function SchemaRegister( config ) {

    /*
     * IMPORT MONGOOSE PLUGINS
     */
    mongooseDouble( mongoose )

    /*
     * REGISTER DATABASE SCHEMAS
     */
    const coreSchemaPath = path.join( __dirname, 'schemas' )
    const coreFilesPaths = _getFilesPathsUnder( coreSchemaPath )
    for ( let schemaIndex = 0, numberOfSchemas = coreFilesPaths.length ; schemaIndex < numberOfSchemas ; schemaIndex++ ) {
        let coreFilePath = coreFilesPaths[ schemaIndex ]
        console.log( 'Register database schema: ' + coreFilePath )
        mongoose = require( coreFilePath )( mongoose )
    }

    /*
     * DATABASE CONNECTION
     */
    mongoose = autoReconnect( mongoose, config )

    return mongoose
}
