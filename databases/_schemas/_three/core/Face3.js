/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Face3
 *
 * @description Todo...
 */

const Vector3 = require( '../math/Vector3' )
const Color   = require( '../math/Color' )

let _schema = undefined

function getSchemaFrom ( Mongoose ) {
    'use strict'

    if ( !_schema ) {
        _createSchema( Mongoose )
    }

    return _schema

}

function _createSchema ( Mongoose ) {
    'use strict'

    const Vector3Schema = Vector3.getSchemaFrom( Mongoose )
    const ColorSchema   = Color.getSchemaFrom( Mongoose )
    const Schema        = Mongoose.Schema

    _schema = new Schema( {
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

module.exports = {
    getSchemaFrom:   getSchemaFrom,
    getModelFrom:    Mongoose => null,
    registerModelTo: Mongoose => Mongoose
}
