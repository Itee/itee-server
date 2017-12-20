/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Geometry
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    var Vector3Schema = mongoose.Schema( {
        x: Number,
        y: Number,
        z: Number
    }, {
        _id: false,
        id:  false
    } )

    var ColorSchema = mongoose.Schema( {
        r: Number,
        g: Number,
        b: Number
    }, {
        _id: false,
        id:  false
    } )

    var Face3Schema = mongoose.Schema( {
        a:             Number,
        b:             Number,
        c:             Number,
        normal:        Vector3Schema,
        vertexNormals: [ Number ],
        color:         ColorSchema,
        vertexColors:  [ Number ],
        materialIndex: Number
    }, {
        _id: false,
        id:  false
    } )

    var GeometrySchema = mongoose.Schema( {
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
