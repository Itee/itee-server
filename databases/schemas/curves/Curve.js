/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Geometry
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    const Schema        = mongoose.Schema
    const Types         = Schema.Types
    const Vector2Schema = require( '../../_core_schemas/Vector2' )( mongoose )
    const Vector3Schema = require( '../../_core_schemas/Vector3' )( mongoose )

    const Curve = mongoose.model( 'Curve', new Schema( {
            arcLengthDivisions: Number
        },
        {
            collection:       'curves',
            discriminatorKey: '_type'
        } ) )

    Curve.discriminator( 'ArcCurve', new Schema( {
        aX: Number,
        aY: Number,
        xRadius: Number,
        yRadius: Number,
        aStartAngle: Number,
        aEndAngle:   Number,
        aClockwise: Boolean,
        aRotation: Number
    } ) )

    Curve.discriminator( 'CatmullRomCurve3', new Schema( {
        points: [ Vector3Schema ],
        closed: Boolean,
        curveType: String,
        tension: Number
    } ) )

    Curve.discriminator( 'CubicBezierCurve', new Schema( {
        v0: Vector2Schema,
        v1: Vector2Schema,
        v2: Vector2Schema,
        v3: Vector2Schema
    } ) )

    Curve.discriminator( 'CubicBezierCurve3', new Schema( {
        v0: Vector3Schema,
        v1: Vector3Schema,
        v2: Vector3Schema,
        v3: Vector3Schema
    } ) )

    Curve.discriminator( 'EllipseCurve', new Schema( {
        aX: Number,
        aY: Number,
        xRadius: Number,
        yRadius: Number,
        aStartAngle: Number,
        aEndAngle:   Number,
        aClockwise: Boolean,
        aRotation: Number
    } ) )

    Curve.discriminator( 'LineCurve', new Schema( {
        v0: Vector2Schema,
        v1: Vector2Schema
    } ) )

    Curve.discriminator( 'LineCurve3', new Schema( {
        v0: Vector3Schema,
        v1: Vector3Schema
    } ) )

    Curve.discriminator( 'QuadraticBezierCurve', new Schema( {
        v0: Vector2Schema,
        v1: Vector2Schema,
        v2: Vector2Schema
    } ) )

    Curve.discriminator( 'QuadraticBezierCurve3', new Schema( {
        v0: Vector3Schema,
        v1: Vector3Schema,
        v2: Vector3Schema
    } ) )

    Curve.discriminator( 'SplineCurve', new Schema( {
        points: [ Vector3Schema ]
    } ) )

    return mongoose

}
