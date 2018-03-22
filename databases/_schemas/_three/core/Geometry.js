/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Geometry
 *
 * @description Todo...
 */

const Vector3 = require( '../math/Vector3' )
const Face3   = require( './Face3' )

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
    const Face3Schema   = Face3.getSchemaFrom( Mongoose )
    const Schema        = Mongoose.Schema

    _schema = new Schema( {
        isGeometry:              {
            type:    Boolean,
            default: true
        },
        uuid:                    String,
        name:                    String,
        type:                    String,
        vertices:                [ Vector3Schema ],
        colors:                  [ Number ],
        faces:                   [ Face3Schema ],
        faceVertexUvs:           [ [ Number ] ],
        morphTargets:            [ Number ],
        morphNormals:            [ Number ],
        skinWeights:             [ Number ],
        skinIndices:             [ Number ],
        lineDistances:           [ Number ],
        boundingBox:             {
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
        boundingSphere:          {
            center: {
                x: Number,
                y: Number,
                z: Number
            },
            radius: Number
        },
        elementsNeedUpdate:      Boolean,
        verticesNeedUpdate:      Boolean,
        uvsNeedUpdate:           Boolean,
        normalsNeedUpdate:       Boolean,
        colorsNeedUpdate:        Boolean,
        lineDistancesNeedUpdate: Boolean,
        groupsNeedUpdate:        Boolean
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

    _model = Mongoose.model( 'Geometry', getSchemaFrom( Mongoose ) )

    _inherit( Mongoose )

}

function _inherit( Mongoose ) {
    'use strict'

    const Schema        = Mongoose.Schema

    _model.discriminator( 'BoxGeometry', new Schema( {} ) )
    _model.discriminator( 'CircleGeometry', new Schema( {} ) )
    _model.discriminator( 'CylinderGeometry', new Schema( {} ) )
        _model.discriminator( 'ConeGeometry', new Schema( {} ) )

    _model.discriminator( 'DodecahedronGeometry', new Schema( {} ) )
    _model.discriminator( 'ExtrudeGeometry', new Schema( {} ) )
    _model.discriminator( 'IcosahedronGeometry', new Schema( {} ) )
    _model.discriminator( 'LatheGeometry', new Schema( {} ) )
    _model.discriminator( 'OctahedronGeometry', new Schema( {} ) )
    _model.discriminator( 'ParametricGeometry', new Schema( {} ) )
    _model.discriminator( 'PlaneGeometry', new Schema( {} ) )
    _model.discriminator( 'PolyhedronGeometry', new Schema( {} ) )
    _model.discriminator( 'RingGeometry', new Schema( {} ) )
    _model.discriminator( 'ShapeGeometry', new Schema( {} ) )
    _model.discriminator( 'TetrahedronGeometry', new Schema( {} ) )
    _model.discriminator( 'TextGeometry', new Schema( {} ) )
    _model.discriminator( 'TorusGeometry', new Schema( {} ) )
    _model.discriminator( 'TorusKnotGeometry', new Schema( {} ) )
    _model.discriminator( 'TubeGeometry', new Schema( {} ) )


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
