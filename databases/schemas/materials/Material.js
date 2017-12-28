/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module Schemas/Material
 *
 * @description Todo...
 */

module.exports = function ( mongoose ) {

    const Schema        = mongoose.Schema
    const Types         = Schema.Types
    const ColorSchema   = require( '../../_core_schemas/Color' )( mongoose )
    const Vector2Schema = require( '../../_core_schemas/Vector2' )( mongoose )
    const Vector3Schema = require( '../../_core_schemas/Vector3' )( mongoose )

    const BaseMaterial = mongoose.model( 'Material', new Schema( {
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
        clippingPlanes:      Types.Mixed,
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
        userData:            Types.Mixed,
        needsUpdate:         Boolean
    }, {
        collection:       'materials',
        discriminatorKey: '_type'
    } ) )

    BaseMaterial.discriminator( 'LineBasicMaterial', new Schema( {
        color:     ColorSchema,
        light:     Boolean,
        lineWidth: Number,
        linecap:   String,
        linejoin:  String
    } ) )

    BaseMaterial.discriminator( 'LineDashedMaterial', new Schema( {
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

    BaseMaterial.discriminator( 'MeshBasicMaterial', new Schema( {
        color:              ColorSchema,
        map:                Types.Mixed, // Unknown yet
        lightMap:           Types.Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Types.Mixed, // Unknown yet
        aoMapIntensity:     Number,
        specularMap:        Types.Mixed, // Unknown yet
        alphaMap:           Types.Mixed, // Unknown yet
        envMap:             Types.Mixed, // Unknown yet
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

    BaseMaterial.discriminator( 'MeshDepthMaterial', new Schema( {
        depthPacking:       Number,
        skinning:           Boolean,
        morphTargets:       Boolean,
        map:                Types.Mixed, // Unknown yet
        alphaMap:           Types.Mixed, // Unknown yet
        displacementMap:    Types.Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        wireframe:          Boolean,
        wireframeLinewidth: Number,
        fog:                Boolean,
        light:              Boolean
    } ) )

    BaseMaterial.discriminator( 'MeshDistanceMaterial', new Schema( {
        referencePosition: Vector3Schema,
        nearDistance:      Number,
        farDistance:       Number,
        skinning:          Boolean,
        morphTargets:      Boolean,
        map:               Types.Mixed, // Unknown yet
        alphaMap:          Types.Mixed, // Unknown yet
        displacementMap:   Types.Mixed, // Unknown yet
        displacementScale: Number,
        displacementBias:  Number,
        fog:               Boolean,
        light:             Boolean
    } ) )

    BaseMaterial.discriminator( 'MeshLambertMaterial', new Schema( {
        color:              ColorSchema,
        map:                Types.Mixed, // Unknown yet
        lightMap:           Types.Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Types.Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Types.Mixed, // Unknown yet
        specularMap:        Types.Mixed, // Unknown yet
        alphaMap:           Types.Mixed, // Unknown yet
        envMap:             Types.Mixed, // Unknown yet
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

    BaseMaterial.discriminator( 'MeshNormalMaterial', new Schema( {
        bumpMap:            Types.Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Types.Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Types.Mixed, // Unknown yet
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

    BaseMaterial.discriminator( 'MeshPhongMaterial', new Schema( {
        color:              ColorSchema,
        specular:           ColorSchema,
        shininess:          Number,
        map:                Types.Mixed, // Unknown yet
        lightMap:           Types.Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Types.Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Types.Mixed, // Unknown yet
        bumpMap:            Types.Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Types.Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Types.Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        specularMap:        Types.Mixed, // Unknown yet
        alphaMap:           Types.Mixed, // Unknown yet
        envMap:             Types.Mixed, // Unknown yet
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

    BaseMaterial.discriminator( 'MeshToonMaterial', new Schema( {
        // MeshPhongMaterial
        color:              ColorSchema,
        specular:           ColorSchema,
        shininess:          Number,
        map:                Types.Mixed, // Unknown yet
        lightMap:           Types.Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Types.Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Types.Mixed, // Unknown yet
        bumpMap:            Types.Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Types.Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Types.Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        specularMap:        Types.Mixed, // Unknown yet
        alphaMap:           Types.Mixed, // Unknown yet
        envMap:             Types.Mixed, // Unknown yet
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
        gradientMap: Types.Mixed
    } ) )

    BaseMaterial.discriminator( 'MeshPhysicalMaterial', new Schema( {
        reflectivity:       Number,
        clearCoat:          Number,
        clearCoatRoughness: Number
    } ) )

    BaseMaterial.discriminator( 'MeshStandardMaterial', new Schema( {
        color:              ColorSchema,
        roughness:          Number,
        metalness:          Number,
        map:                Types.Mixed, // Unknown yet
        lightMap:           Types.Mixed, // Unknown yet
        lightMapIntensity:  Number,
        aoMap:              Types.Mixed, // Unknown yet
        aoMapIntensity:     Number,
        emissive:           ColorSchema,
        emissiveIntensity:  Number,
        emissiveMap:        Types.Mixed, // Unknown yet
        bumpMap:            Types.Mixed, // Unknown yet
        bumpScale:          Number,
        normalMap:          Types.Mixed, // Unknown yet
        normalScale:        Vector2Schema,
        displacementMap:    Types.Mixed, // Unknown yet
        displacementScale:  Number,
        displacementBias:   Number,
        roughnessMap:       Types.Mixed, // Unknown yet
        metalnessMap:       Types.Mixed, // Unknown yet
        alphaMap:           Types.Mixed, // Unknown yet
        envMap:             Types.Mixed, // Unknown yet
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

    BaseMaterial.discriminator( 'PointsMaterial', new Schema( {
        color:           ColorSchema,
        map:             Types.Mixed, // Unknown yet
        size:            Number,
        sizeAttenuation: Boolean,
        lights:          Boolean
    } ) )

    BaseMaterial.discriminator( 'ShaderMaterial', new Schema( {
        defines:            Types.Mixed, // Unknown yet
        uniforms:           Types.Mixed, // Unknown yet
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

    BaseMaterial.discriminator( 'ShadowMaterial', new Schema( {
        color:       ColorSchema,
        opacity:     Number,
        lights:      Boolean,
        transparent: Boolean
    } ) )

    BaseMaterial.discriminator( 'SpriteMaterial', new Schema( {
        color:    ColorSchema,
        map:      Types.Mixed, // Unknown yet
        rotation: Number,
        fog:      Boolean,
        lights:   Boolean
    } ) )

    return mongoose

}
