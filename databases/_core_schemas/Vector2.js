/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Core/Vector2
 *
 * @description The database counterpart of Three.Vector2
 */

let Vector2Schema = undefined

module.exports = function ( mongoose ) {

    if ( !Vector2Schema ) {

        Vector2Schema = new mongoose.Schema( {
            x: Number,
            y: Number
        }, {
            _id: false,
            id:  false
        } )

    }

    return Vector2Schema

}
