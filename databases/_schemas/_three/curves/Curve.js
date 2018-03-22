/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Geometry
 *
 * @description Todo...
 */

const Vector2 = require( '../math/Vector2' )
const Vector3 = require( '../math/Vector3' )

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

    _schema = new Schema( {
            type:               {
                type:    String,
                default: 'Curve'
            },
            arcLengthDivisions: Number
        },
        {
            collection:       'curves',
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

    _model = Mongoose.model( 'Curve', getSchemaFrom( Mongoose ) )

    _inherit( Mongoose )

}

function _inherit ( Mongoose ) {
    'use strict'

    const Vector2Schema = Vector2.getSchemaFrom( Mongoose )
    const Vector3Schema = Vector3.getSchemaFrom( Mongoose )
    const Schema        = Mongoose.Schema
    const Types         = Schema.Types
    const ObjectId      = Types.ObjectId

    _model.discriminator( 'ArcCurve', new Schema( {
        // EllipseCurve inheritance
        aX:          Number,
        aY:          Number,
        xRadius:     Number,
        yRadius:     Number,
        aStartAngle: Number,
        aEndAngle:   Number,
        aClockwise:  Boolean,
        aRotation:   Number
    } ) )

    _model.discriminator( 'CatmullRomCurve3', new Schema( {
        points:    [ Vector3Schema ],
        closed:    Boolean,
        curveType: String,
        tension:   Number
    } ) )

    _model.discriminator( 'CubicBezierCurve', new Schema( {
        v0: Vector2Schema,
        v1: Vector2Schema,
        v2: Vector2Schema,
        v3: Vector2Schema
    } ) )

    _model.discriminator( 'CubicBezierCurve3', new Schema( {
        v0: Vector3Schema,
        v1: Vector3Schema,
        v2: Vector3Schema,
        v3: Vector3Schema
    } ) )

    _model.discriminator( 'EllipseCurve', new Schema( {
        aX:          Number,
        aY:          Number,
        xRadius:     Number,
        yRadius:     Number,
        aStartAngle: Number,
        aEndAngle:   Number,
        aClockwise:  Boolean,
        aRotation:   Number
    } ) )

    _model.discriminator( 'LineCurve', new Schema( {
        v0: Vector2Schema,
        v1: Vector2Schema
    } ) )

    _model.discriminator( 'LineCurve3', new Schema( {
        v0: Vector3Schema,
        v1: Vector3Schema
    } ) )

    _model.discriminator( 'QuadraticBezierCurve', new Schema( {
        v0: Vector2Schema,
        v1: Vector2Schema,
        v2: Vector2Schema
    } ) )

    _model.discriminator( 'QuadraticBezierCurve3', new Schema( {
        v0: Vector3Schema,
        v1: Vector3Schema,
        v2: Vector3Schema
    } ) )

    _model.discriminator( 'SplineCurve', new Schema( {
        points: [ Vector3Schema ]
    } ) )

    // Todo: use nested schemas ???
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
    _model.discriminator( 'CurvePath', new Schema( {
        curves:    [ NestedCurveSchema ], // Curve
        autoClose: {
            type:    Boolean,
            default: false
        }
    } ) )

    _model.discriminator( 'Path', new Schema( {

        // CurvePath inheritance
        curves:    [ NestedCurveSchema ], // Curve
        autoClose: {
            type:    Boolean,
            default: false
        },

        // Path inheritance
        currentPoint: Vector2Schema

    } ) )

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
    _model.discriminator( 'Shape', new Schema( {

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
    getSchemaFrom,
    getModelFrom,
    registerModelTo
}
