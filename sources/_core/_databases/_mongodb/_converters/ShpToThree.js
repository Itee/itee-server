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
const ShpLoader       = require( '../../../_server/_loaders/SHPLoader' )

////

class ShpToThree extends FileToThreeBase {

    constructor () {
        super( arguments )
    }

    _convert ( parameters, onSuccess, onProgress, onError ) {

        try {

            const loader    = new ShpLoader()
            const threeData = loader.parse( this._fileData )
            onSuccess( threeData )

        } catch ( error ) {

            onError( error )

        }

    }

}

module.exports = ShpToThree
