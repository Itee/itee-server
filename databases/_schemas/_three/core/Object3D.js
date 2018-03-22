/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Object3D
 *
 * @description Todo...
 */

const Vector3 = require( '../math/Vector3' )
const Color   = require( '../math/Color' )

let _schema = undefined
let _model  = undefined

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
    const Types         = Schema.Types
    const ObjectId      = Types.ObjectId
    const Mixed         = Types.Mixed

    _schema = new Schema( {
            uuid:                   String,
            name:                   String,
            type:                   String,
            parent:                 ObjectId,
            children:               [ ObjectId ],
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
            userData:               Mixed
        },
        {
            collection:       'objects',
            discriminatorKey: '_type'
        } )

}

function getModelFrom ( Mongoose ) {
    'use strict'

    if ( !_model ) {
        _createModel( Mongoose )
    }

    return _model

}

function _createModel ( Mongoose ) {
    'use strict'

    _model = Mongoose.model( 'Object3D', getSchemaFrom( Mongoose ) )

    _inherit ( Mongoose )

}

function _inherit ( Mongoose ) {
    'use strict'

    const Vector3Schema = Vector3.getSchemaFrom( Mongoose )
    const ColorSchema   = Color.getSchemaFrom( Mongoose )
    const Schema        = Mongoose.Schema
    const Types         = Schema.Types

    _model.discriminator( 'Audio', new Schema( {} ) )
    _model.discriminator( 'PositionalAudio', new Schema( {} ) )
    _model.discriminator( 'AudioListener', new Schema( {} ) )
    _model.discriminator( 'ArrowHelper', new Schema( {} ) )
    _model.discriminator( 'Bone', new Schema( {} ) )
    _model.discriminator( 'Camera', new Schema( {} ) )
    _model.discriminator( 'PerspectiveCamera', new Schema( {} ) )
    _model.discriminator( 'ArrayCamera', new Schema( {} ) )
    _model.discriminator( 'OrthographicCamera', new Schema( {} ) )
    _model.discriminator( 'CubeCamera', new Schema( {} ) )
    _model.discriminator( 'DirectionalLightHelper', new Schema( {} ) )
    _model.discriminator( 'HemisphereLightHelper', new Schema( {} ) )
    _model.discriminator( 'ImmediateRenderObject', new Schema( {} ) )
    _model.discriminator( 'LensFlare', new Schema( {
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
    _model.discriminator( 'Light', new Schema( {} ) )
    _model.discriminator( 'AmbientLight', new Schema( {} ) )
    _model.discriminator( 'DirectionalLight', new Schema( {} ) )
    _model.discriminator( 'HemisphereLight', new Schema( {} ) )
    _model.discriminator( 'PointLight', new Schema( {} ) )
    _model.discriminator( 'RectAreaLight', new Schema( {} ) )
    _model.discriminator( 'SpotLight', new Schema( {} ) )
    _model.discriminator( 'Line', new Schema( {
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
    _model.discriminator( 'LineLoop', new Schema( {
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
    _model.discriminator( 'LineSegments', new Schema( {
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
    _model.discriminator( 'AxesHelper', new Schema( {} ) )
    _model.discriminator( 'BoxHelper', new Schema( {} ) )
    _model.discriminator( 'Box3Helper', new Schema( {} ) )
    _model.discriminator( 'CameraHelper', new Schema( {} ) )
    _model.discriminator( 'FaceNormalsHelper', new Schema( {} ) )
    _model.discriminator( 'GridHelper', new Schema( {} ) )
    _model.discriminator( 'PolarGridHelper', new Schema( {} ) )
    _model.discriminator( 'SkeletonHelper', new Schema( {} ) )
    _model.discriminator( 'VertexNormalHelper', new Schema( {} ) )
    _model.discriminator( 'PlaneHelper', new Schema( {} ) )
    _model.discriminator( 'LOD', new Schema( {
        levels: [ Types.Mixed ]
    } ) )
    _model.discriminator( 'Mesh', new Schema( {
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
    _model.discriminator( 'PointLightHelper', new Schema( {} ) )
    _model.discriminator( 'SkinnedMesh', new Schema( {
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
    _model.discriminator( 'Group', new Schema( {} ) )
    _model.discriminator( 'Points', new Schema( {
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
    _model.discriminator( 'RectAreaLightHelper', new Schema( {} ) )
    _model.discriminator( 'Scene', new Schema( {
        background:       ColorSchema,
        fog:              Types.Mixed,
        overrideMaterial: String,
        autoUpdate:       Boolean
    } ) )
    _model.discriminator( 'Sprite', new Schema( {
        material: [
            {
                type: Types.ObjectId,
                ref:  'SpriteMaterial'
            }
        ]
    } ) )
    _model.discriminator( 'SpotLightHelper', new Schema( {} ) )




    // Should be elsewhere
    _model.discriminator( 'Skeleton', new Schema( {
        bones:        [ Types.ObjectId ],
        boneMatrices: [ Number ] // Float32Array( this.bones.length * 16 )
    } ) )



}

function registerModelTo ( Mongoose ) {
    'use strict'

    if ( !_model ) {
        _createModel( Mongoose )
    }

    return Mongoose

}

module.exports = {
    getSchemaFrom:   getSchemaFrom,
    getModelFrom:    getModelFrom,
    registerModelTo: registerModelTo
}
