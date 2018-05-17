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
const { isFunction } = require( '../validators/Validator' )
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
 * Check the file size against a limit ( 0 as default ).
 * @param filePath
 * @param limit
 * @return {boolean} - True if below the limit or zero, false otherwise
 * @private
 */
function _fileIsEmpty ( filePath, limit ) {
    'use strict'

    const _limit   = limit || 0
    const fileSize = fs.statSync( filePath ).size

    return ( fileSize < _limit )

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

    /**
     * Register Itee Mongoose types
     */
    const typesBasePath   = path.join( __dirname, '_types' )
    const typesFilesPaths = _getFilesPathsUnder( typesBasePath )
    let typeFilePath      = ''
    let typeFile          = undefined

    for ( let typeIndex = 0, numberOfTypes = typesFilesPaths.length ; typeIndex < numberOfTypes ; typeIndex++ ) {

        typeFilePath = typesFilesPaths[ typeIndex ]

        if ( _fileIsEmpty( typeFilePath, 200 ) ) {
            console.warn( `Skip empty core database schema: ${typeFilePath}` )
            continue
        }

        typeFile = require( typeFilePath )

        if ( isFunction( typeFile ) ) {

            console.log( `Register type: ${typeFilePath}` )
            mongoose = typeFile( mongoose )

        } else {

            console.error( `Unable to register type: ${typeFilePath}` )

        }

    }

    /**
     * Register Itee database schemas and models
     */
    const coreSchemasBasePath   = path.join( __dirname, '_schemas' )
    const coreSchemasFilesPaths = _getFilesPathsUnder( coreSchemasBasePath )
    let coreSchemaFilePath      = ''
    let coreSchemaFile          = undefined
    for ( let schemaIndex = 0, numberOfSchemas = coreSchemasFilesPaths.length ; schemaIndex < numberOfSchemas ; schemaIndex++ ) {

        coreSchemaFilePath = coreSchemasFilesPaths[ schemaIndex ]

        if ( _fileIsEmpty( coreSchemaFilePath, 200 ) ) {
            console.warn( `Skip empty core database schema: ${coreSchemaFilePath}` )
            continue
        }

        coreSchemaFile = require( coreSchemaFilePath )

        if ( isFunction( coreSchemaFile ) ) {

            console.log( `Direct register local database schema: ${coreSchemaFilePath}` )
            mongoose = coreSchemaFile( mongoose )

        } else if ( isFunction( coreSchemaFile.registerModelTo ) ) {

            console.log( `Register core database schema: ${coreSchemaFilePath}` )
            mongoose = coreSchemaFile.registerModelTo( mongoose )

        } else {

            console.error( `Unable to register core database schema: ${coreSchemaFilePath}` )

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

            console.warn( `Skip empty local database schema: ${localSchemaFilePath}` )
            continue
        }

        localSchemaFile = require( localSchemaFilePath )

        if ( isFunction( localSchemaFile ) ) {

            console.log( `Direct register local database schema: ${localSchemaFilePath}` )
            mongoose = localSchemaFile( mongoose )

        } else if ( isFunction( localSchemaFile.registerModelTo ) ) {

            console.log( `Register local database schema: ${localSchemaFilePath}` )
            mongoose = localSchemaFile.registerModelTo( mongoose )

        } else {

            console.error( `Unable to register local database schema: ${localSchemaFilePath}` )

        }

    }

    /*
     * DATABASE CONNECTION
     */
    mongoose = autoReconnect( mongoose, config )

    return mongoose
}
