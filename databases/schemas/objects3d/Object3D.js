/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Object3D
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    const Schema        = mongoose.Schema
    const Types         = Schema.Types
    const ColorSchema   = require( '../../_core_schemas/Color' )( mongoose )
    const Vector3Schema = require( '../../_core_schemas/Vector3' )( mongoose )

    const Object3D = mongoose.model( 'Object3D', new Schema( {
            uuid:                   String,
            name:                   String,
            type:                   String,
            parent:                 Types.ObjectId,
            children:               [ Types.ObjectId ],
            up:                     Vector3Schema,
            position:               Vector3Schema,
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
            scale:                  Vector3Schema,
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
            userData:               Types.Mixed
        },
        {
            collection:       'objects',
            discriminatorKey: '_type'
        } ) )

    Object3D.discriminator( 'Bone', new Schema( {} ) )

    Object3D.discriminator( 'Group', new Schema( {} ) )

    Object3D.discriminator( 'LensFlare', new Schema( {
        lensFlares:     [
            {
                texture:  Types.ObjectId,
                size:     Number,
                distance: Number,
                x:        Number,
                y:        Number,
                z:        Number,
                scale:    Number,
                rotation: Number,
                opacity:  Number,
                color:    ColorSchema,
                blending: Number
            }
        ],
        positionScreen: Vector3Schema
    } ) )

    Object3D.discriminator( 'Line', new Schema( {
        geometry: {
            type: Types.ObjectId,
            ref:  'Geometry'
        },
        material: [
            {
                type: Types.ObjectId,
                ref:  'LineBasicMaterial'
            }
        ],
        drawMode: Number
    } ) )

    Object3D.discriminator( 'LineLoop', new Schema( {
        geometry: {
            type: Types.ObjectId,
            ref:  'Geometry'
        },
        material: [
            {
                type: Types.ObjectId,
                ref:  'LineBasicMaterial'
            }
        ],
        drawMode: Number
    } ) )

    Object3D.discriminator( 'LineSegments', new Schema( {
        geometry: {
            type: Types.ObjectId,
            ref:  'Geometry'
        },
        material: [
            {
                type: Types.ObjectId,
                ref:  'LineBasicMaterial'
            }
        ],
        drawMode: Number
    } ) )

    Object3D.discriminator( 'LOD', new Schema( {
        levels: [ Types.Mixed ]
    } ) )

    Object3D.discriminator( 'Mesh', new Schema( {
        geometry: {
            type: Types.ObjectId,
            ref:  'Geometry'
        },
        material: [
            {
                type: Types.ObjectId,
                ref:  'Material'
            }
        ],
        drawMode: Number
    } ) )

    Object3D.discriminator( 'Points', new Schema( {
        geometry: {
            type: Types.ObjectId,
            ref:  'Geometry'
        },
        material: [
            {
                type: Types.ObjectId,
                ref:  'PointsMaterial'
            }
        ],
        drawMode: Number
    } ) )

    Object3D.discriminator( 'Scene', new Schema( {
        background:       ColorSchema,
        fog:              Types.Mixed,
        overrideMaterial: String,
        autoUpdate:       Boolean
    } ) )

    Object3D.discriminator( 'Skeleton', new Schema( {
        bones:        [ Types.ObjectId ],
        boneMatrices: [ Number ] // Float32Array( this.bones.length * 16 )
    } ) )

    Object3D.discriminator( 'SkinnedMesh', new Schema( {
        // Mesh
        geometry: {
            type: Types.ObjectId,
            ref:  'Geometry'
        },
        material: [
            {
                type: Types.ObjectId,
                ref:  'Material'
            }
        ],
        drawMode: Number,

        // SkinnedMesh
        bindMode:          String,
        bindMatrix:        [ Number ],
        bindMatrixInverse: [ Number ],

    } ) )

    Object3D.discriminator( 'Sprite', new Schema( {
        material: [
            {
                type: Types.ObjectId,
                ref:  'SpriteMaterial'
            }
        ]
    } ) )

    return mongoose

}
