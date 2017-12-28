/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Face3
 *
 * @description Todo...
 */

let Face3Schema = undefined

module.exports = function ( mongoose ) {

    if( !Face3Schema ) {

        const Vector3Schema = require( './Vector3')(mongoose)
        const ColorSchema = require( './Color')(mongoose)

        Face3Schema = mongoose.Schema( {
            a:             Number,
            b:             Number,
            c:             Number,
            normal:        Vector3Schema,
            vertexNormals: [ Number ],
            color:         ColorSchema,
            vertexColors:  [ Number ],
            materialIndex: Number
        }, {
            _id: false,
            id:  false
        } )

    }

    return Face3Schema

}
