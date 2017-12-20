/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Mesh
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    var schemaTypes = mongoose.Schema.Types

    var MeshSchema = mongoose.Schema( {
            uuid:                   String,
            name:                   String,
            type:                   String,
            parent:                 schemaTypes.ObjectId,
            children:               [ schemaTypes.ObjectId ],
            up:                     {
                x: Number,
                y: Number,
                z: Number
            },
            position:               {
                x: Number,
                y: Number,
                z: Number
            },
            rotation:               {
                x:     Number,
                y:     Number,
                z:     Number,
                order: String
            },
            quaternion:             {
                x: Number,
                y: Number,
                z: Number,
                w: Number
            },
            scale:                  {
                x: Number,
                y: Number,
                z: Number
            },
            modelViewMatrix:        [ Number ],
            normalMatrix:           [ Number ],
            matrix:                 [ Number ],
            matrixWorld:            [ Number ],
            matrixAutoUpdate:       Boolean,
            matrixWorldNeedsUpdate: Boolean,
            layers:                 Number,
            visible:                Boolean,
            castShadow:             Boolean,
            receiveShadow:          Boolean,
            frustumCulled:          Boolean,
            renderOrder:            Boolean,
            userData:               schemaTypes.Mixed,
            // Specific
            geometry:               {
                type: schemaTypes.ObjectId,
                ref:  'Geometry'
            }, //schemaTypes.Mixed,
            material:               [{
                type: schemaTypes.ObjectId,
                ref:  'MeshPhongMaterial'
            }],
            drawMode:               Number
        },
        {
            collection: 'objects',
            //            discriminatorKey: '_type'
        } )

    mongoose.model( 'Mesh', MeshSchema )

    return mongoose

}
