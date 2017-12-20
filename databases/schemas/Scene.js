/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Scene
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    var schemaTypes = mongoose.Schema.Types

    const ColorSchema = mongoose.Schema( {
        r: Number,
        g: Number,
        b: Number
    }, {
        _id: false,
        id:  false
    } )

    //    var fogSchema = mongoose.Schema({
    //        coordinates: {
    //            x: schemaTypes.Double,
    //            y: schemaTypes.Double,
    //            z: schemaTypes.Double
    //        },
    //        orientation: {
    //            x: schemaTypes.Double,
    //            y: schemaTypes.Double,
    //            z: schemaTypes.Double
    //        },
    //        thumbnail: Buffer,
    //        path: String
    //    }, { _id: false, id: false })

    var SceneSchema = mongoose.Schema( {
        uuid:                   String,
        name:                   String,
        type:                   String,
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
        background:             ColorSchema,
        fog:                    schemaTypes.Mixed,
        overrideMaterial:       String,
        autoUpdate:             Boolean
    } )

    mongoose.model( 'Scene', SceneSchema )

    return mongoose

}
