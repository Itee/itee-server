/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
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
    const Double = Types.Double

    _schema = new Schema( {
        coordinates: {
            x: Double,
            y: Double,
            z: Double
        },
        orientation: {
            x: Double,
            y: Double,
            z: Double
        },
        thumbnail:   Buffer,
        path:        String
    }, {
        _id: false,
        id:  false
    } )

}

module.exports = {
    getSchemaFrom: getSchemaFrom,
    getModelFrom: Mongoose => null,
    registerModelTo: Mongoose => Mongoose
}
