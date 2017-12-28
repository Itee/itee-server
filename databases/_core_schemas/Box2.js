/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Core/Box2
 *
 * @description The database counterpart of Three.Box2
 */

let Box2Schema = undefined

module.exports = function ( mongoose ) {

    if ( !Box2Schema ) {

        const Vector2Schema = require( '../../_core_schemas/Vector2' )( mongoose )

        Box2Schema = new mongoose.Schema( {
            min: Vector2Schema,
            max: Vector2Schema
        }, {
            _id: false,
            id:  false
        } )

    }

    return Box2Schema

}
