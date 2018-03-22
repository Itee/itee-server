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
const fs                       = require( 'fs' )
const path                     = require( 'path' )
const mongooseDouble           = require( 'mongoose-double' )
const autoReconnect            = require( './TAutoReconnect' )
const { isFunction, isObject } = require( './validators/Validator' )
let mongoose                   = require( 'mongoose' )

/**
 * Just an override of 'fs.existsSync' with more explicit name
 *
 * @param filePath the path to check
 * @private
 */
function _fileExistForPath ( filePath ) {

    return fs.existsSync( filePath )

}

function _fileIsEmpty( filePath, limit ) {
    'use strict'
    
    const _limit = limit || 0
    const fileSize = fs.statSync( filePath ).size
    
    return ( fileSize > _limit )
    
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
module.exports = function SchemaRegister ( config ) {

    /*
     * IMPORT MONGOOSE PLUGINS
     */
    mongooseDouble( mongoose )

    /*
     * REGISTER ITEE DATABASE SCHEMAS
     */
    const coreSchemasBasePath   = path.join( __dirname, '_schemas' )
    const coreSchemasFilesPaths = _getFilesPathsUnder( coreSchemasBasePath )
    let coreSchemaFilePath      = ''
    let coreSchemaFile          = undefined
    for ( let schemaIndex = 0, numberOfSchemas = coreSchemasFilesPaths.length ; schemaIndex < numberOfSchemas ; schemaIndex++ ) {

        coreSchemaFilePath = coreSchemasFilesPaths[ schemaIndex ]

        if ( _fileIsEmpty( coreSchemaFilePath, 200 ) ) {

            coreSchemaFile = require( coreSchemaFilePath )

            if ( isFunction( coreSchemaFile.registerModelTo ) ) {

                console.log( `Register core database schema: ${coreSchemaFilePath}` )
                mongoose = coreSchemaFile.registerModelTo( mongoose )

            } else {

                console.error( `Unable to register core database schema: ${coreSchemaFilePath}` )

            }

        } else {

            console.warn( `Skip empty core database schema: ${coreSchemaFilePath}` )

        }

    }

    /*
     * REGISTER LOCAL DATABASE SCHEMAS
     */
    const localSchemasBasePath   = path.join( __dirname, 'schemas' )
    const localSchemasFilesPaths = _getFilesPathsUnder( localSchemasBasePath )
    let localSchemaFilePath      = ''
    let localSchemaFile          = undefined
    for ( let schemaIndex = 0, numberOfSchemas = localSchemasFilesPaths.length ; schemaIndex < numberOfSchemas ; schemaIndex++ ) {

        localSchemaFilePath = localSchemasFilesPaths[ schemaIndex ]

        if ( _fileIsEmpty( localSchemaFilePath ) ) {

            localSchemaFile = require( localSchemaFilePath )

            if ( isFunction( localSchemaFile.registerModelTo ) ) {

                console.log( `Register local database schema: ${localSchemaFilePath}` )
                mongoose = localSchemaFile.registerModelTo( mongoose )

            } else {

                console.error( `Unable to register local database schema: ${localSchemaFilePath}` )

            }

        } else {

            console.warn( `Skip empty local database schema: ${localSchemaFilePath}` )

        }

    }

    /*
     * DATABASE CONNECTION
     */
    mongoose = autoReconnect( mongoose, config )

    return mongoose
}
