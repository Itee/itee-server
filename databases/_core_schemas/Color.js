/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Color
 *
 * @description The database counterpart of Three.Color
 */

let ColorSchema = undefined

module.exports = function ( mongoose ) {

    if ( !ColorSchema ) {

        ColorSchema = new mongoose.Schema( {
            r: Number,
            g: Number,
            b: Number
        }, {
            _id: false,
            id:  false
        } )

    }

    return ColorSchema

}
