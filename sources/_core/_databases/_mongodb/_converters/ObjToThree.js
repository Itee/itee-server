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
const THREE = require( 'three-full' )

class MtlToThree extends FileToThreeBase {

    constructor () {

        super( arguments )
        this.dumpType = 'string'

    }

    _convert ( parameters, onSuccess, onProgress, onError ) {

        try {

            const loader    = new THREE.OBJLoader()
//            const loader    = new ObjLoader()

            if(parameters && parameters.materials){
                loader.setMaterials( parameters.materials )
            }
            const threeData = loader.parse( this._fileData )
            onSuccess( threeData )

        } catch ( error ) {

            onError( error )

        }

    }

}

module.exports = MtlToThree
