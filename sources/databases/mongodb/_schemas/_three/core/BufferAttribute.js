/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Geometry
 *
 * @description Todo...
 */

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

    const Schema = Mongoose.Schema
    const Types  = Schema.Types
    const Mixed  = Types.Mixed

    _schema = new Schema( {
        array:       [ Number ],
        count:       Number,
        dynamic:     Boolean,
        itemSize:    Number,
        name:        String,
        needsUpdate: Boolean,
        normalized:  Boolean,
        updateRange: Mixed,
        uuid:        String,
        version:     Number
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
