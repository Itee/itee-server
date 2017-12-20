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

    const schemaTypes = mongoose.Schema.Types

    var BufferAttribute = mongoose.Schema( {
        array:       [ Number ],
        count:       Number,
        dynamic:     Boolean,
        itemSize:    Number,
        name:        String,
        needsUpdate: Boolean,
        normalized:  Boolean,
        updateRange: schemaTypes.Mixed,
        uuid:        String,
        version:     Number
    }, {
        _id: false,
        id:  false
    } )

    var BufferGeometrySchema = mongoose.Schema( {
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
        drawRange:        schemaTypes.Mixed,
        groups:           schemaTypes.Mixed,
        //        index:          schemaTypes.Mixed,
        index:            BufferAttribute,
        name:             String,
        uuid:             String
    }, {
        collection:       'geometries',
        discriminatorKey: '_type'
    } )

    mongoose.model( 'BufferGeometry', BufferGeometrySchema )

    return mongoose

}
