/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Modules/UploadDispatcher
 *
 * @description This module will dispatch the uplaod file to the correct parser.
 */

const I           = require( 'i-return' )
const AscFile     = require( './AscFile' )
const MtlFile     = require( './MtlFile' )
const ObjFile     = require( './ObjFile' )
const JsonFile    = require( './JsonFile' )
const RzmlFile    = require( './RzmlFile' )
const SectionFile = require( './SectionFile' )

let numberOfFileToProcess = 0
const errors              = []

function saveFilesInDatabase ( request, response ) {

    const buildingId    = request.body.buildingId
    const fileSize      = parseInt( request.body.fileSize )
    const files         = convertFilesObjectToArray( request.files )
    const numberOfFiles = files.length

    if ( numberOfFiles === 0 ) {

        I.returnData( null, response )

    } else if ( numberOfFiles === 1 ) {

        saveSingleFile( buildingId, fileSize, files[ 0 ], response )

    } else if ( numberOfFiles === 2 ) {

        saveAssociativeFiles( files[ 0 ], files[ 1 ], response )

    } else {

        I.returnError( `Impossible d'analyser ${numberOfFiles} fichiers associatifs simultanément !`, response )

    }

    // In case where a single file was of an unknown type
    checkEndOfReturns( response )

}

function convertFilesObjectToArray ( files ) {

    const fileArray = []

    for ( let field in files ) {

        if ( files.hasOwnProperty( field ) ) {

            fileArray.push( files[ field ] )

        }

    }

    return fileArray

}

function saveSingleFile ( buildingId, fileSize, file, response ) {

    const splitName      = file.filename.split( '.' )
    const numberOfSplits = splitName.length

    if ( numberOfSplits < 2 ) {

        errors.push( {
            title:   'Mauvaise extension de fichier',
            message: 'Les fichier sans extension ne sont pas géré !'
        } )

        return

    }

    const fileExtension = splitName[ numberOfSplits - 1 ] // Check file extension
    switch ( fileExtension ) {

        case 'asc':
            numberOfFileToProcess++
            AscFile.parse( file.file, fileParsingCallback.bind( this, response ) )
            break

        case 'obj':
            numberOfFileToProcess++
            ObjFile.parse( file.file, null, fileParsingCallback.bind( this, response ) )
            break

        case 'json':
            numberOfFileToProcess++
            JsonFile.parse( buildingId, fileSize, file, fileParsingCallback.bind( this, response ) )
            break

        default:
            errors.push( {
                title:   'Mauvaise extension de fichier',
                message: `Le format de fichier ${fileExtension} n'est pas géré !`
            } )

    }

}

function saveAssociativeFiles ( firstFile, secondFile, response ) {

    const firstSplitName      = firstFile.filename.split( '.' )
    const firstNumberOfSplits = firstSplitName.length

    const secondSplitName      = secondFile.filename.split( '.' )
    const secondNumberOfSplits = secondSplitName.length

    if ( firstNumberOfSplits < 2 || secondNumberOfSplits < 2 ) {

        errors.push( {
            title:   'Mauvaise extension de fichier',
            message: 'Les fichiers sans extension ne sont pas gérés !'
        } )

        return

    }

    // Check files extensions
    const firstFileExtension  = firstSplitName[ firstNumberOfSplits - 1 ]
    const secondFileExtension = secondSplitName[ secondNumberOfSplits - 1 ]

    if ( firstFileExtension === 'mtl' && secondFileExtension === 'obj' ) {

        numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package

        MtlFile.parse( firstFile.file, ( error, materials ) => {

            if ( error ) {
                fileParsingCallback( response, error )
                return
            }

            materials.preload()

            ObjFile.parse( secondFile.file, materials, fileParsingCallback.bind( this, response ) )

        } )

    } else if ( firstFileExtension === 'obj' && secondFileExtension === 'mtl' ) {

        numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package

        MtlFile.parse( secondFile.file, ( error, materials ) => {

            if ( error ) {
                fileParsingCallback( response, error )
                return
            }

            materials.preload()

            ObjFile.parse( firstFile.file, materials, fileParsingCallback.bind( this, response ) )

        } )

    } else {

        errors.push( {
            title:   'Mauvaise extension de fichier',
            message: 'Extension de fichiers associaifs inconnue: ' + firstFileExtension + ', ' + secondFileExtension
        } )

    }

}

function fileParsingCallback ( response, error ) {

    if ( error ) { errors.push( error ) }

    numberOfFileToProcess--
    checkEndOfReturns( response )

}

function checkEndOfReturns ( response ) {

    if ( numberOfFileToProcess > 0 ) { return }

    ( errors.length > 0 ) ?
        I.returnError( errors, response ) :
        I.returnData( null, response )

}

// Return the public interface
module.exports = {
    saveFileInDataBase: saveFilesInDatabase
}
