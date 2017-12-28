/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Geometry
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    const Vector3Schema = require( '../../_core_schemas/Vector3')(mongoose)
    const Face3Schema = require( '../../_core_schemas/Face3')(mongoose)

    const GeometrySchema = mongoose.Schema( {
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

    mongoose.model( 'Geometry', GeometrySchema )

    return mongoose

}
