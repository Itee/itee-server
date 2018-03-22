/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/BufferGeometry
 *
 * @description Todo...
 */

const BufferAttribute = require( './BufferAttribute' )
const Vector2         = require( '../math/Vector2' )

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

    const Schema = Mongoose.Schema
    const Types  = Schema.Types
    const Mixed  = Types.Mixed

    const BufferAttributeSchema = BufferAttribute.getSchemaFrom( Mongoose )

    _schema = new Schema( {
        isBufferGeometry: {
            type:    Boolean,
            default: true
        },
        attributes:       {
            position: {
                type:    BufferAttributeSchema,
                default: null
            },
            normal:   {
                type:    BufferAttributeSchema,
                default: null
            },
            color:    {
                type:    BufferAttributeSchema,
                default: null
            },
            uv:       {
                type:    BufferAttributeSchema,
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
        drawRange:        Mixed,
        groups:           Mixed,
        index:            BufferAttributeSchema,
        name:             String,
        uuid:             String
    }, {
        collection:       'geometries',
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

    _model = Mongoose.model( 'BufferGeometry', getSchemaFrom( Mongoose ) )

    _inherit( Mongoose )

}

function _inherit ( Mongoose ) {
    'use strict'

    const Vector2Schema = Vector2.getSchemaFrom( Mongoose )
    const Schema        = Mongoose.Schema

    _model.discriminator( 'BoxBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'CircleBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'CylinderBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'ConeBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'EdgesGeometry', new Schema( {} ) )

    _model.discriminator( 'ExtrudeBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'TextBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'InstancedBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'LatheBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'ParametricBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'PlaneBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'PolyhedronBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'IcosahedronBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'OctahedronBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'TetrahedronBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'RingBufferGeometry', new Schema( {} ) )

    const NestedCurveSchema = new Schema(
        {
            type:               {
                type:    String,
                default: 'Curve'
            },
            arcLengthDivisions: Number
        },
        {
            id:  false,
            _id: false
        }
    )

    const NestedPathSchema = new Schema(
        {

            // CurvePath inheritance
            curves:    [ NestedCurveSchema ], // Curve
            autoClose: {
                type:    Boolean,
                default: false
            },

            // Path inheritance
            currentPoint: Vector2Schema

        },
        {
            id:  false,
            _id: false
        }
    )

    const NestedShapeSchema = new Schema(
        {

            // CurvePath inheritance
            curves:    [ NestedCurveSchema ], // Curve
            autoClose: {
                type:    Boolean,
                default: false
            },

            // Path inheritance
            currentPoint: Vector2Schema,

            // Shape inheritance
            uuid:  String,
            holes: [ NestedPathSchema ] // Path

        },
        {
            id:  false,
            _id: false
        }
    )

    _model.discriminator( 'ShapeBufferGeometry', new Schema( {
        type:          {
            type:    String,
            default: 'ShapeBufferGeometry'
        },
        shapes:        [ NestedShapeSchema ],
        curveSegments: Number
    } ) )

    _model.discriminator( 'SphereBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'TorusBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'TorusKnotBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'TubeBufferGeometry', new Schema( {} ) )

    _model.discriminator( 'WireframeBufferGeometry', new Schema( {} ) )

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
