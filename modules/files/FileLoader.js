/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Modules/UploadDispatcher
 *
 * @description This module will dispatch the uplaod file to the correct parser.
 */

var I = require( 'i-return' )
//var AscFile = require( './AscFile' )
//var MtlFile = require( './MtlFile' )
//var ObjFile = require( './ObjFile' )
var JsonFile = require( './JSONFile' )

function saveFilesInDatabase ( request, response ) {

    var buildingId = request.body.buildingId
    var fileSize   = request.body.fileSize

    var errors                = []
    var numberOfFileToProcess = 0

    var files         = convertFilesObjectToArray( request.files )
    var numberOfFiles = files.length

    if ( numberOfFiles === 0 ) {

        I.returnData( null, response )

    } else if ( numberOfFiles === 1 ) {

        parseSingleFile( buildingId, fileSize, files[ 0 ] )

    } else if ( numberOfFiles === 2 ) {

        //        parseAssociativeFiles( files[ 0 ], files[ 1 ] )

    } else {

        I.returnError( "Impossible d'analyser " + numberOfFiles + " fichiers associatifs simultanément !", response, 406 )

    }

    function convertFilesObjectToArray ( files ) {

        var fileArray = []

        for ( var field in files ) {

            if ( files.hasOwnProperty( field ) ) {

                fileArray.push( files[ field ] )

            }

        }

        return fileArray

    }

    function parseSingleFile ( buildingId, fileSize, file ) {

        var splitName      = file.filename.split( '.' )
        var fileSize       = parseInt( fileSize )
        var numberOfSplits = splitName.length

        if ( numberOfSplits < 2 ) {

            errors.push( {
                title:   'Mauvaise extension de fichier',
                message: 'Les fichier sans extension ne sont pas géré !'
            } )

            return

        }

        var fileExtension = splitName[ numberOfSplits - 1 ] // Check file extension
        switch ( fileExtension ) {

            //            case 'asc':
            //                numberOfFileToProcess++
            //                AscFile.parse( file.file, fileParsingCallback )
            //                break

            //            case 'obj':
            //                numberOfFileToProcess++
            //                ObjFile.parse( file.file, null, fileParsingCallback )
            //                break

            case 'json':
                numberOfFileToProcess++
                JsonFile.parse( buildingId, fileSize, file, fileParsingCallback )
                break

            default:
                errors.push( {
                    title:   'Mauvaise extension de fichier',
                    message: 'Le format de fichier ' + fileExtension + ' n\'est pas géré !'
                } )

        }

    }

    //    function parseAssociativeFiles( firstFile, secondFile ) {
    //
    //        var firstSplitName      = firstFile.filename.split( '.' )
    //        var firstNumberOfSplits = firstSplitName.length
    //
    //        var secondSplitName      = secondFile.filename.split( '.' )
    //        var secondNumberOfSplits = secondSplitName.length
    //
    //        if ( firstNumberOfSplits < 2 || secondNumberOfSplits < 2 ) {
    //
    //            errors.push( {
    //                title:   'Mauvaise extension de fichier',
    //                message: 'Les fichiers sans extension ne sont pas gérés !'
    //            } )
    //
    //            return
    //
    //        }
    //
    //        // Check files extensions
    //        var firstFileExtension = firstSplitName[ firstNumberOfSplits - 1 ]
    //        var secondFileExtension = secondSplitName[ secondNumberOfSplits - 1 ]
    //
    //        if ( firstFileExtension === 'mtl' && secondFileExtension === 'obj' ) {
    //
    //            numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package
    //
    ////            mtlLoader.setTexturePath( secondFilePath + '/textures/' + TEXTURE_RESOLUTION + '/' )
    //            MtlFile.parse( firstFile.file, function( error, materials ) {
    //
    //                if ( error ) {
    //                    fileParsingCallback( error )
    //                    return
    //                }
    //
    ////                materials.preload()
    //
    //                ObjFile.parse( secondFile.file, materials, fileParsingCallback )
    //
    //            })
    //
    //
    //        } else if ( firstFileExtension === 'obj' && secondFileExtension === 'mtl' ) {
    //
    //            numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package
    //
    //            MtlFile.parse( secondFile.file, function( error, materials ) {
    //
    //                if ( error ) {
    //                    fileParsingCallback( error )
    //                    return
    //                }
    //
    //                materials.preload()
    //
    //                ObjFile.parse( firstFile.file, materials, fileParsingCallback )
    //
    //            })
    //
    //        } else {
    //
    //            errors.push( {
    //                title:   'Mauvaise extension de fichier',
    //                message: 'Extension de fichiers associaifs inconnue: ' + firstFileExtension + ', ' + secondFileExtension
    //            } )
    //
    //        }
    //
    //
    //    }

    function fileParsingCallback ( error ) {

        if ( error ) { errors.push( error ) }

        numberOfFileToProcess--
        checkEndOfReturns()

    }

    function checkEndOfReturns () {

        if ( numberOfFileToProcess > 0 ) { return }

        ( errors.length > 0 ) ?
            I.returnError( errors, response, 406 ) :
            I.returnData( null, response )

    }

    // In case where a single file was of an unknown type
    checkEndOfReturns()

}

// Return the public interface
module.exports = {
    saveFileInDataBase: saveFilesInDatabase
}
