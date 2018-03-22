/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Core/Vector3
 *
 * @description The database counterpart of Three.Vector3
 */

const Vector3 = require( '../math/Vector3' )

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
    const Schema        = Mongoose.Schema

    _schema = new Schema( {
        origin:    Vector3Schema,
        direction: Vector3Schema
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
