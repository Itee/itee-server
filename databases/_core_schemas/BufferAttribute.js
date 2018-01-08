/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Geometry
 *
 * @description Todo...
 */

let BufferAttribute = undefined

module.exports = function ( mongoose ) {

    const Schema = mongoose.Schema
    const Types  = Schema.Types

    if ( !BufferAttribute ) {

        BufferAttribute = new Schema( {
            array:       [ Number ],
            count:       Number,
            dynamic:     Boolean,
            itemSize:    Number,
            name:        String,
            needsUpdate: Boolean,
            normalized:  Boolean,
            updateRange: Types.Mixed,
            uuid:        String,
            version:     Number
        }, {
            _id: false,
            id:  false
        } )

    }

    return BufferAttribute

}
