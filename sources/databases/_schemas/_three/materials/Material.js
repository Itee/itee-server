/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Material
 *
 * @description Todo...
 */

const Vector2 = require( '../math/Vector2' )
const Color   = require( '../math/Color' )
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
    const Types  = Schema.Types
    const Mixed  = Types.Mixed

    _schema = new Schema( {
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
        clippingPlanes:      Mixed,
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
        userData:            Mixed,
        needsUpdate:         Boolean
    }, {
        collection:       'materials',
        discriminatorKey: 'type'
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

    // We need to pre-declare the base model to be able to use correctly
    // the discriminator 'type' correctly with the main type, instead of
    // directly register the model as it
    _model = Mongoose.model( 'Materials', getSchemaFrom( Mongoose ) )
    _model.discriminator( 'Material', new Mongoose.Schema( {} ) )

    _inherit ( Mongoose )

}

function _inherit ( Mongoose ) {

    const ColorSchema   = Color.getSchemaFrom( Mongoose )
    const Vector2Schema = Vector2.getSchemaFrom( Mongoose )
    const Vector3Schema = Vector3.getSchemaFrom( Mongoose )
    const Schema        = Mongoose.Schema
    const Types         = Schema.Types
    const Mixed         = Types.Mixed

    _model.discriminator( 'LineDashedMaterial', new Schema( {
        // LineBasicMaterial
        color:     ColorSchema,
        light:     Boolean,
        lineWidth: Number,
        linecap:   String,
        linejoin:  String,

        // LineDashedMaterial
        dashSize: Number,
        gapSize:  Number,
        scale:    Number
    } ) )

    _model.discriminator( 'MeshBasicMaterial', new Schema( {
        color:              ColorSchema,
        map:                Mixed, // Unknown yet
        lightMap:           Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Mixed, // Unknown yet
        aoMapIntensity:     Number,
        specularMap:        Mixed, // Unknown yet
        alphaMap:           Mixed, // Unknown yet
        envMap:             Mixed, // Unknown yet
        combine:            Number,
        reflectivity:       Number,
        refractionRatio:    Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        wireframeLinecap:   String,
        wireframeLinejoin:  String,
        skinning:           Boolean,
        morphTargets:       Boolean,
        light:              Boolean
    } ) )

    _model.discriminator( 'MeshDepthMaterial', new Schema( {
        depthPacking:       Number,
        skinning:           Boolean,
        morphTargets:       Boolean,
        map:                Mixed, // Unknown yet
        alphaMap:           Mixed, // Unknown yet
        displacementMap:    Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        fog:                Boolean,
        light:              Boolean
    } ) )

    _model.discriminator( 'MeshDistanceMaterial', new Schema( {
        referencePosition: Vector3Schema,
        nearDistance:      Number,
        farDistance:       Number,
        skinning:          Boolean,
        morphTargets:      Boolean,
        map:               Mixed, // Unknown yet
        alphaMap:          Mixed, // Unknown yet
        displacementMap:   Mixed, // Unknown yet
        displacementScale: Number,
        displacementBias:  Number,
        fog:               Boolean,
        light:             Boolean
    } ) )

    _model.discriminator( 'MeshLambertMaterial', new Schema( {
        color:              ColorSchema,
        map:                Mixed, // Unknown yet
        lightMap:           Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Mixed, // Unknown yet
        specularMap:        Mixed, // Unknown yet
        alphaMap:           Mixed, // Unknown yet
        envMap:             Mixed, // Unknown yet
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
    } ) )

    _model.discriminator( 'MeshNormalMaterial', new Schema( {
        bumpMap:            Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        fog:                Boolean,
        light:              Boolean,
        skinning:           Boolean,
        morphTargets:       Boolean,
        morphNormals:       Boolean
    } ) )

    _model.discriminator( 'MeshPhongMaterial', new Schema( {
        color: Types.Color,

//        directColorObject: { r: Number, g: Number, b: Number },
//        directColorNested: ColorSchema,
//        directColorMixed:  Mixed,
//        directColorType:   Types.Color,
//
//        assignColorObject: { r: Number, g: Number, b: Number },
//        assignColorNested: ColorSchema,
//        assignColorMixed:  Mixed,
//        assignColorType:   Types.Color,
//
//        arrayColorsObject: [ { r: Number, g: Number, b: Number } ],
//        arrayColorsNested: [ ColorSchema ],
//        arrayColorsMixed:  [ Mixed ],
//        arrayColorsType:   [ Types.Color ],


        specular:           ColorSchema,
        shininess:          Number,
        map:                Mixed, // Unknown yet
        lightMap:           Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Mixed, // Unknown yet
        bumpMap:            Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        specularMap:        Mixed, // Unknown yet
        alphaMap:           Mixed, // Unknown yet
        envMap:             Mixed, // Unknown yet
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
    } ) )

    _model.discriminator( 'MeshToonMaterial', new Schema( {
        // MeshPhongMaterial
        color:              ColorSchema,
        specular:           ColorSchema,
        shininess:          Number,
        map:                Mixed, // Unknown yet
        lightMap:           Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Mixed, // Unknown yet
        bumpMap:            Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        specularMap:        Mixed, // Unknown yet
        alphaMap:           Mixed, // Unknown yet
        envMap:             Mixed, // Unknown yet
        combine:            Number,
        reflectivity:       Number,
        refractionRatio:    Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        wireframeLinecap:   String,
        wireframeLinejoin:  String,
        skinning:           Boolean,
        morphTargets:       Boolean,
        morphNormals:       Boolean,

        // MeshToonMaterial
        gradientMap: Mixed
    } ) )

    _model.discriminator( 'MeshPhysicalMaterial', new Schema( {
        reflectivity:       Number,
        clearCoat:          Number,
        clearCoatRoughness: Number
    } ) )

    _model.discriminator( 'MeshStandardMaterial', new Schema( {
        color:              ColorSchema,
        roughness:          Number,
        metalness:          Number,
        map:                Mixed, // Unknown yet
        lightMap:           Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Mixed, // Unknown yet
        bumpMap:            Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        roughnessMap:       Mixed, // Unknown yet
        metalnessMap:       Mixed, // Unknown yet
        alphaMap:           Mixed, // Unknown yet
        envMap:             Mixed, // Unknown yet
        envMapIntensity:    Number,
        refractionRatio:    Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        wireframeLinecap:   String,
        wireframeLinejoin:  String,
        skinning:           Boolean,
        morphTargets:       Boolean,
        morphNormals:       Boolean
    } ) )

    _model.discriminator( 'PointsMaterial', new Schema( {
        color:           ColorSchema,
        map:             Mixed, // Unknown yet
        size:            Number,
        sizeAttenuation: Boolean,
        lights:          Boolean
    } ) )

    _model.discriminator( 'ShaderMaterial', new Schema( {
        defines:            Mixed, // Unknown yet
        uniforms:           Mixed, // Unknown yet
        vertexShader:       String,
        fragmentShader:     String,
        linewidth:          Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        fog:                Boolean,
        light:              Boolean,
        clipping:           Boolean,
        skinning:           Boolean,
        morphTargets:       Boolean,
        morphNormals:       Boolean,
        derivatives:        Boolean,
        fragDepth:          Boolean,
        drawBuffers:        Boolean,
        shaderTextureLOD:   Boolean
    } ) )

    _model.discriminator( 'ShadowMaterial', new Schema( {
        color:       ColorSchema,
        opacity:     Number,
        lights:      Boolean,
        transparent: Boolean
    } ) )

    _model.discriminator( 'SpriteMaterial', new Schema( {
        color:    ColorSchema,
        map:      Mixed, // Unknown yet
        rotation: Number,
        fog:      Boolean,
        lights:   Boolean
    } ) )


}

function registerModelTo ( Mongoose ) {

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

