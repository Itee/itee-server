/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Modules/UploadDispatcher
 *
 * @description This module will dispatch the uplaod file to the correct parser.
 */

const I     = require( 'i-return' )
const path  = require( 'path' )
const THREE = require( 'three' )

const AscFile     = require( './AscFile' )
const JsonFile    = require( './JsonFile' )
const RzmlFile    = require( './RzmlFile' )
const SectionFile = require( './SectionFile' )

const JsonToThree  = require( '../converters/JsonToThree' )
const ShpToThree  = require( '../converters/ShpToThree' )
const DbfToThree  = require( '../converters/DbfToThree' )
const MtlToThree  = require( '../converters/MtlToThree' )
const ObjToThree  = require( '../converters/ObjToThree' )
const Obj2ToThree = require( '../converters/Obj2ToThree' )

const ThreeToMongoDB = require( '../converters/ThreeToMongoDB' )

const FileFormat = Object.freeze( {
    Asc:  '.asc',
    Dbf:  '.dbf',
    Fbx:  '.fbx',
    Mtl:  '.mtl',
    Json: '.json',
    Obj:  '.obj',
    Shp:  '.shp',
    Stl:  '.stl',

    toString () {

        const formats = Object.values( this )
        let result    = ''
        for ( let index = 0, numberOfFormats = formats.length ; index < numberOfFormats ; index++ ) {
            result += formats[ index ]
            result += ((index === numberOfFormats - 1) ? ', ' : '.')
        }

    }
} )

class FilesToDatabase {

    constructor () {

        this._numberOfFileToProcess = 0
        this._errors                = []

        this._jsonToThree = new JsonToThree()
        this._shpToThree = new ShpToThree()
        this._dbfToThree = new DbfToThree()
        this._mtlToThree = new MtlToThree()
        this._objToThree = (true) ? new ObjToThree() : new Obj2ToThree()

        this._parentId = undefined
        this._threeToMongo = new ThreeToMongoDB()

    }

    // Public
    saveFilesInDatabase ( request, response ) {

        const parameters    = request.body
        const files         = this._convertFilesObjectToArray( request.files )
        const numberOfFiles = files.length

        this._parentId = parameters.parentId

        if ( numberOfFiles === 0 ) {

            I.returnData( null, response )

        } else if ( numberOfFiles === 1 ) {

            this._saveSingleFile( files[ 0 ], parameters, response )

        } else if ( numberOfFiles === 2 ) {

            this._saveAssociativeFiles( files[ 0 ], files[ 1 ], parameters, response )

        } else {

            I.returnError( `Impossible d'analyser ${numberOfFiles} fichiers associatifs simultanément !`, response )

        }

    }

    // Private
    _convertFilesObjectToArray ( files ) {

        const fileArray = []

        for ( let field in files ) {

            if ( files.hasOwnProperty( field ) ) {

                fileArray.push( files[ field ] )

            }

        }

        return fileArray

    }

    _fileConversionSuccessCallback ( response, extraSuccessCallback, data ) {

        if ( extraSuccessCallback ) {
            extraSuccessCallback( data )
            return
        }

        this._threeToMongo.save(
            this._parentId,
            data,
            ( success ) => {
                this._numberOfFileToProcess--
                this._checkEndOfReturns( response, [{title: 'Succées', message: `Sauvegarder avec l'identifiant: ${success}`}] )
            },
            this._fileConversionProgressCallback.bind( this, response ),
            this._fileConversionErrorCallback.bind( this, response )
        )

    }

    _fileConversionProgressCallback ( response, progress ) {

        console.log( progress )

    }

    _fileConversionErrorCallback ( response, error ) {

        this._errors.push( error )
        this._numberOfFileToProcess--
        this._checkEndOfReturns( response )

    }

    _checkEndOfReturns ( response, data ) {

        if ( this._numberOfFileToProcess > 0 ) { return }

        if ( this._errors.length > 0 ) {
            I.return( response )( this._errors )
            this._errors = []
        } else {
            I.returnData( data, response )
        }

    }

    ///

    _saveSingleFile ( file, parameters, response ) {

        const fileExtension = path.extname( file.filename )

        this._numberOfFileToProcess++

        switch ( fileExtension ) {

            case FileFormat.Asc:
                this._saveAsc( file.file, parameters, response )
                break

            case FileFormat.Obj:
                this._saveObj( file.file, parameters, response )
                break

            case FileFormat.Mtl:
                this._saveMtl( file.file, parameters, response )
                break

            case FileFormat.Json:
                this._saveJson( file.file, parameters, response )
                break

            case FileFormat.Shp:
                this._saveShp( file.file, parameters, response )
                break

            default:
                this._errors.push( {
                    title:   'Mauvaise extension de fichier',
                    message: `Le format de fichier ${fileExtension} n'est pas géré !`
                } )
                this._numberOfFileToProcess--
                this._checkEndOfReturns( response )
                break

        }

    }

    _saveAsc ( file, parameters, response ) {

        AscFile.parse( file, parameters, this._fileConversionErrorCallback.bind( this, response ) )

    }

    _saveObj ( file, parameters, response ) {

        this._objToThree.convert(
            file,
            parameters,
            this._fileConversionSuccessCallback.bind( this, response, null ),
            this._fileConversionProgressCallback.bind( this, response ),
            this._fileConversionErrorCallback.bind( this, response )
        )

    }

    _saveMtl ( file, parameters, response ) {

        this._mtlToThree.convert(
            file,
            parameters,
            this._fileConversionSuccessCallback.bind( this, response, null ),
            this._fileConversionProgressCallback.bind( this, response ),
            this._fileConversionErrorCallback.bind( this, response )
        )

    }

    _saveJson ( file, parameters, response ) {

        this._jsonToThree.convert(
            file,
            parameters,
            this._fileConversionSuccessCallback.bind( this, response, null ),
            this._fileConversionProgressCallback.bind( this, response ),
            this._fileConversionErrorCallback.bind( this, response )
        )

    }

    _saveShp ( file, parameters, response ) {

        this._shpToThree.convert(
            file,
            parameters,
            this._fileConversionSuccessCallback.bind( this, response, null ),
            this._fileConversionProgressCallback.bind( this, response ),
            this._fileConversionErrorCallback.bind( this, response )
        )

    }

    ///

    _saveAssociativeFiles ( firstFile, secondFile, parameters, response ) {

        // Check files extensions
        const firstFileExtension  = path.extname( firstFile.filename )
        const secondFileExtension = path.extname( secondFile.filename )

        this._numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package

        if ( firstFileExtension === FileFormat.Mtl && secondFileExtension === FileFormat.Obj ) {

            this._saveObjMtlCouple( secondFile.file, firstFile.file, parameters, response )

        } else if ( firstFileExtension === FileFormat.Obj && secondFileExtension === FileFormat.Mtl ) {

            this._saveObjMtlCouple( firstFile.file, secondFile.file, parameters, response )

        } else if ( firstFileExtension === FileFormat.Shp && secondFileExtension === FileFormat.Dbf ) {

            this._saveShpDbfCouple( firstFile.file, secondFile.file, parameters, response )

        } else if ( firstFileExtension === FileFormat.Dbf && secondFileExtension === FileFormat.Shp ) {

            this._saveShpDbfCouple( secondFile.file, firstFile.file, parameters, response )

        } else {

            this._errors.push( {
                title:   'Mauvaise extension de fichier',
                message: `Extension de fichiers associaifs inconnue: ${firstFileExtension}, ${secondFileExtension}`
            } )
            this._numberOfFileToProcess--
            this._checkEndOfReturns( response )

        }

    }

    _saveObjMtlCouple ( objFile, mtlFile, parameters, response ) {

        this._mtlToThree.convert(
            mtlFile,
            parameters,
            this._fileConversionSuccessCallback.bind( this, response, function ( materials ) {

                materials.preload()
                parameters[ 'materials' ] = materials

                this._objToThree.convert(
                    objFile,
                    parameters,
                    this._fileConversionSuccessCallback.bind( this, response, null ),
                    this._fileConversionProgressCallback.bind( this, response ),
                    this._fileConversionErrorCallback.bind( this, response )
                )

            }.bind(this) ),
            this._fileConversionProgressCallback.bind( this, response ),
            this._fileConversionErrorCallback.bind( this, response )
        )

    }

    _saveShpDbfCouple ( shpFile, dbfFile, parameters, response ) {

        const self = this

        this._shpToThree.convert(
            shpFile,
            parameters,
            this._fileConversionSuccessCallback.bind( this, response, function ( shpData ) {

                this._dbfToThree.convert( dbfFile,
                    parameters,
                    dbfData => {

                        const group = new THREE.Group()
                        group.name  = "Locaux"

                        let mesh = undefined
                        for ( let shapeIndex = 0, numberOfShapes = shpData.length ; shapeIndex < numberOfShapes ; shapeIndex++ ) {

                            mesh = new THREE.Mesh(
                                new THREE.ShapeBufferGeometry( shpData[ shapeIndex ] ),
                                new THREE.MeshPhongMaterial( {
                                    color: 0xb0f2b6,
                                    side:  THREE.DoubleSide
                                } )
                            )

                            const shapeName         = dbfData.datas[ shapeIndex ][ 'CODE' ]
                            mesh.name               = shapeName
                            mesh.userData[ 'Code' ] = shapeName

                            group.add( mesh )

                        }

                        group.rotateX( THREE.Math.degToRad( -90 ) )
                        group.rotateZ( THREE.Math.degToRad( 180 ) )

                        group.position.z -= 159.5
                        group.position.x -= 0.6
                        group.position.y = 14

                        // Insert to db here !
                        self._fileConversionSuccessCallback( response, null, group )

                    },
                    this._fileConversionProgressCallback.bind( this, response ),
                    this._fileConversionErrorCallback.bind( this, response )
                )

            }.bind(this) ),
            this._fileConversionProgressCallback.bind( this, response ),
            this._fileConversionErrorCallback.bind( this, response )
        )

    }

    _saveThreeInMongoDB ( threeData ) {

        console.log( threeData )

    }

}

module.exports = FilesToDatabase

//
//let _numberOfFileToProcess = 0
//const errors              = []
//
//const shpToDb = new ShpToDatabase()
//const dbfToDb = new DbfToDataBase()
//
//function saveFilesInDatabase ( request, response ) {
//
//    const parameters    = request.body
//    const files         = convertFilesObjectToArray( request.files )
//    const numberOfFiles = files.length
//
//    if ( numberOfFiles === 0 ) {
//
//        I.returnData( null, response )
//
//    } else if ( numberOfFiles === 1 ) {
//
//        saveSingleFile( files[ 0 ], parameters, response )
//
//    } else if ( numberOfFiles === 2 ) {
//
//        saveAssociativeFiles( files[ 0 ], files[ 1 ], parameters, response )
//
//    } else {
//
//        I.returnError( `Impossible d'analyser ${numberOfFiles} fichiers associatifs simultanément !`, response )
//
//    }
//
//    // In case where a single file was of an unknown type
//    checkEndOfReturns( response )
//
//}
//
//function convertFilesObjectToArray ( files ) {
//
//    const fileArray = []
//
//    for ( let field in files ) {
//
//        if ( files.hasOwnProperty( field ) ) {
//
//            fileArray.push( files[ field ] )
//
//        }
//
//    }
//
//    return fileArray
//
//}
//
//function saveSingleFile ( file, parameters, response ) {
//
//    const fileExtension = path.extname( file.filename )
//    switch ( fileExtension ) {
//
//        case 'asc':
//            _numberOfFileToProcess++
//            AscFile.parse( file, parameters, fileParsingCallback.bind( this, response ) )
//            break
//
//        case 'obj':
//            _numberOfFileToProcess++
//            ObjFile.parse( file, parameters, fileParsingCallback.bind( this, response ) )
//            break
//
//        case 'json':
//            _numberOfFileToProcess++
//            JsonFile.parse( file, parameters, fileParsingCallback.bind( this, response ) )
//            break
//
//        case 'shp':
//            _numberOfFileToProcess++
//            shpToDb.processFile( file, parameters, fileParsingCallback.bind( this, response ) )
//            break
//
//        default:
//            errors.push( {
//                title:   'Mauvaise extension de fichier',
//                message: `Le format de fichier ${fileExtension} n'est pas géré !`
//            } )
//
//    }
//
//}
//
//function saveAssociativeFiles ( firstFile, secondFile, parameters, response ) {
//
//    // Check files extensions
//    const firstFileExtension  = path.extname( firstFile.filename )
//    const secondFileExtension = path.extname( secondFile.filename )
//
//    if ( firstFileExtension === 'mtl' && secondFileExtension === 'obj' ) {
//
//        _numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package
//
//        MtlFile.parse( firstFile.file, parameters, ( error, materials ) => {
//
//            if ( error ) {
//                fileParsingCallback( response, error )
//                return
//            }
//
//            materials.preload()
//            parameters[ 'materials' ] = materials
//
//            ObjFile.parse( secondFile.file, parameters, fileParsingCallback.bind( this, response ) )
//
//        } )
//
//    } else if ( firstFileExtension === 'obj' && secondFileExtension === 'mtl' ) {
//
//        _numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package
//
//        MtlFile.parse( secondFile.file, parameters, ( error, materials ) => {
//
//            if ( error ) {
//                fileParsingCallback( response, error )
//                return
//            }
//
//            materials.preload()
//            parameters[ 'materials' ] = materials
//
//            ObjFile.parse( firstFile.file, parameters, fileParsingCallback.bind( this, response ) )
//
//        } )
//
//    } else if ( firstFileExtension === 'shp' && secondFileExtension === 'dbf' ) {
//
//        _numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package
//
//        shpToDb.processFile( firstFile.file, parameters, ( error, shapes ) => {
//
//            if ( error ) {
//                fileParsingCallback( response, error )
//                return
//            }
//
//            parameters[ 'shapes' ] = shapes
//
//            dbfToDb.processFile( secondFile.file, parameters, fileParsingCallback.bind( this, response ) )
//
//        } )
//
//    } else if ( firstFileExtension === 'dbf' && secondFileExtension === 'shp' ) {
//
//        _numberOfFileToProcess++ // Unecessary to set to 2 due to the fact that files are considered as a single package
//
//        shpToDb.processFile( secondFile.file, parameters, ( error, shapes ) => {
//
//            if ( error ) {
//                fileParsingCallback( response, error )
//                return
//            }
//
//            parameters[ 'shapes' ] = shapes
//
//            dbfToDb.processFile( firstFile.file, parameters, fileParsingCallback.bind( this, response ) )
//
//        } )
//
//    } else {
//
//        errors.push( {
//            title:   'Mauvaise extension de fichier',
//            message: `Extension de fichiers associaifs inconnue: ${firstFileExtension}, ${secondFileExtension}`
//        } )
//
//    }
//
//}
//
//function fileParsingCallback ( response, error ) {
//
//    if ( error ) { errors.push( error ) }
//
//    _numberOfFileToProcess--
//    checkEndOfReturns( response )
//
//}
//
//function checkEndOfReturns ( response ) {
//
//    if ( _numberOfFileToProcess > 0 ) { return }
//
//    ( errors.length > 0 ) ?
//        I.returnError( errors, response ) :
//        I.returnData( null, response )
//
//}
//
//// Return the public interface
//module.exports = {
//    saveFileInDataBase: saveFilesInDatabase
//}
