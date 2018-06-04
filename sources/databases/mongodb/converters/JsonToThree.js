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
const THREE = require( '../../../../node_modules/threejs-full-es6/builds/Three.cjs' )
//const THREE = require( 'threejs-full-es6' )
//const THREE           = require( 'three' )

////

class JsonToThree extends FileToThreeBase {

    constructor () {

        super( arguments )
        this.dumpType = 'json'

    }

    _convert ( parameters, onSuccess, onProgress, onError ) {

        try {

            const loader    = new THREE.ObjectLoader()
            const threeData = loader.parse( this._fileData )
            onSuccess( threeData )

        } catch ( error ) {

            onError( error )

        }

    }

}

module.exports = JsonToThree
