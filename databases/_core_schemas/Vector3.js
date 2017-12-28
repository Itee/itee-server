/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Core/Vector3
 *
 * @description The database counterpart of Three.Vector3
 */

let Vector3Schema = undefined

module.exports = function ( mongoose ) {

    if ( !Vector3Schema ) {

        Vector3Schema = new mongoose.Schema( {
            x: Number,
            y: Number,
            z: Number
        }, {
            _id: false,
            id:  false
        } )

    }

    return Vector3Schema

}
