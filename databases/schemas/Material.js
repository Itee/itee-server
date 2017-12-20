/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Material
 *
 * @description Todo...
 */

const extend = require( 'mongoose-schema-extend' );

module.exports = function ( mongoose ) {

    const schemaTypes = mongoose.Schema.Types

    const ColorSchema = mongoose.Schema( {
        r: Number,
        g: Number,
        b: Number
    }, {
        _id: false,
        id:  false
    } )

    const Vector2Schema = mongoose.Schema( {
        x: Number,
        y: Number
    }, {
        _id: false,
        id:  false
    } )

    const MaterialSchema = mongoose.Schema( {
        uuid:                String,
        name:                String,
        type:                String,
        fog:                 Boolean,
        lights:              Boolean,
        blending:            Number,
        side:                Number,
        flatShading:         Boolean,
        vertexColors:        Number,
        opacity:             Number,
        transparent:         Boolean,
        blendSrc:            Number,
        blendDst:            Number,
        blendEquation:       Number,
        blendSrcAlpha:       String,
        blendDstAlpha:       String,
        blendEquationAlpha:  String,
        depthFunc:           Number,
        depthTest:           Boolean,
        depthWrite:          Boolean,
        clippingPlanes:      schemaTypes.Mixed,
        clipIntersection:    Boolean,
        clipShadows:         Boolean,
        colorWrite:          Boolean,
        precision:           Number,
        polygonOffset:       Boolean,
        polygonOffsetFactor: Number,
        polygonOffsetUnits:  Number,
        dithering:           Boolean,
        alphaTest:           Number,
        premultipliedAlpha:  Boolean,
        overdraw:            Number,
        visible:             Boolean,
        userData:            schemaTypes.Mixed,
        needsUpdate:         Boolean
    }, {
        collection:       'materials',
        discriminatorKey: '_type'
    } )
    mongoose.model( 'Material', MaterialSchema )

    const MeshPhongMaterialSchema = MaterialSchema.extend( {
        color:              ColorSchema,
        specular:           ColorSchema,
        shininess:          Number,
        map:                schemaTypes.Mixed, // Unknown yet
        lightMap:           schemaTypes.Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              schemaTypes.Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        schemaTypes.Mixed, // Unknown yet
        bumpMap:            schemaTypes.Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          schemaTypes.Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    schemaTypes.Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        specularMap:        schemaTypes.Mixed, // Unknown yet
        alphaMap:           schemaTypes.Mixed, // Unknown yet
        envMap:             schemaTypes.Mixed, // Unknown yet
        combine:            Number,
        reflectivity:       Number,
        refractionRatio:    Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        wireframeLinecap:   String,
        wireframeLinejoin:  String,
        skinning:           Boolean,
        morphTargets:       Boolean,
        morphNormals:       Boolean
    } )
    mongoose.model( 'MeshPhongMaterial', MeshPhongMaterialSchema )

    const LineBasicMaterialSchema = MaterialSchema.extend( {
        color:     ColorSchema,
        light:     Boolean,
        lineWidth: Number,
        linecap:   String,
        linejoin:  String
    } )
    mongoose.model( 'LineBasicMaterial', LineBasicMaterialSchema )

    return mongoose

}
