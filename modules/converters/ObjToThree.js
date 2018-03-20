/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

const FileToThreeBase = require( './FileToThreeBase' )
const ObjLoader           = require( '../loaders/ObjLoader' )

////

class MtlToThree extends FileToThreeBase {

    constructor () {

        super( arguments )
        this.dumpType = 'string'

    }

    _convert ( parameters, onSuccess, onProgress, onError ) {

        try {

            const loader    = new ObjLoader()
            const threeData = loader.parse( this._fileData )
            onSuccess( threeData )

        } catch ( error ) {

            onError( error )

        }

    }

}

module.exports = MtlToThree
