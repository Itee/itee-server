/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/BufferGeometry
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    //    // Todo
    //    var BufferGeometrySchema = mongoose.Schema( {
    //        buffer: Buffer
    //    } )

    const Schema          = mongoose.Schema
    const Types           = Schema.Types
    const BufferAttribute = require( '../../_core_schemas/BufferAttribute' )( mongoose )

    const BufferGeometry = mongoose.model( 'BufferGeometry', new Schema( {
        isBufferGeometry: {
            type:    Boolean,
            default: true
        },
        attributes:       {
            position: {
                type:    BufferAttribute,
                default: null
            },
            normal:   {
                type:    BufferAttribute,
                default: null
            },
            color:    {
                type:    BufferAttribute,
                default: null
            },
            uv:       {
                type:    BufferAttribute,
                default: null
            }
        },
        boundingBox:      {
            min: {
                x: Number,
                y: Number,
                z: Number
            },
            max: {
                x: Number,
                y: Number,
                z: Number
            }
        },
        boundingSphere:   {
            center: {
                x: Number,
                y: Number,
                z: Number
            },
            radius: Number
        },
        drawRange:        Types.Mixed,
        groups:           Types.Mixed,
        index:            BufferAttribute,
        name:             String,
        uuid:             String
    }, {
        collection:       'geometries',
        discriminatorKey: '_type'
    } ) )



    return mongoose

}
