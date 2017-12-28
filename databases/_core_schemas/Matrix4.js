/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Core/Vector3
 *
 * @description The database counterpart of Three.Vector3
 */

let Matrix4Schema = undefined

module.exports = function ( mongoose ) {

    if ( !Matrix4Schema ) {

        Matrix4Schema = new mongoose.Schema( {
            elements: [ Number ]
        }, {
            _id: false,
            id:  false
        } )

    }

    return Matrix4Schema

}
