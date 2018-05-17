/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

const { isNullOrUndefined, isNotNumber, isNotObject } = require( '../validators/Validator' )

function registerSchemaTypeFor ( Mongoose ) {
    'use strict'

    const SchemaType = Mongoose.SchemaType
    const Schema     = Mongoose.Schema
    const Types      = Schema.Types

    // Declare type
    function Color ( key, options ) {
        SchemaType.call( this, key, options, 'Color' )
    }

    Color.prototype = Object.assign( Object.create( SchemaType.prototype ), {

        cast ( value ) {

            if ( isNullOrUndefined( value ) ) {
                throw new Error( `Color: ${value} is null or undefined` )
            }

            if ( isNotObject( value ) ) {
                throw new Error( `Color: ${value} is not a object` )
            }

            if ( !('r' in value) ) {
                throw new Error( `Color: ${value} does not contain r property` )
            }

            if ( isNotNumber(value.r) ) {
                throw new Error( `Color: ${value} expected to be a number` )
            }

            if ( !('g' in value) ) {
                throw new Error( `Color: ${value} does not contain g property` )
            }

            if ( isNotNumber(value.g) ) {
                throw new Error( `Color: ${value} expected to be a number` )
            }

            if ( !('b' in value) ) {
                throw new Error( `Color: ${value} does not contain b property` )
            }

            if ( isNotNumber(value.b) ) {
                throw new Error( `Color: ${value} expected to be a number` )
            }

            return value

        }

    } )

    // Register type
    Types.Color = Color
    return Mongoose

}

module.exports = registerSchemaTypeFor
