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

    const Texture = mongoose.model( 'Texture', new Schema( {
            uuid:             String,
            name:             String,
            image:            Types.ObjectId,
            mipmaps:          [],
            mapping:          Number,
            wrapS:            Number,
            wrapT:            Number,
            magFilter:        Number,
            minFilter:        Number,
            anisotropy:       Number,
            format:           Number,
            type:             Number,
            offset:           Vector2Schema,
            repeat:           Vector2Schema,
            center:           Vector2Schema,
            rotation:         Number,
            matrixAutoUpdate: Boolean,
            matrix:           [ Number ],
            generateMipmaps:  Boolean,
            premultiplyAlpha: Boolean,
            flipY:            Boolean,
            unpackAlignment:  Number,
            encoding:         Number,
            version:          Number
        },
        {
            collection:       'textures',
            discriminatorKey: '_type'
        } ) )

    Texture.discriminator( 'CanvasTexture', new Schema( {
        needsUpdate: Boolean
    } ) )

    Texture.discriminator( 'CompressedTexture', new Schema( {} ) )

    Texture.discriminator( 'CubeTexture', new Schema( {} ) )

    Texture.discriminator( 'DataTexture', new Schema( {} ) )

    Texture.discriminator( 'DepthTexture', new Schema( {} ) )

    Texture.discriminator( 'VideoTexture', new Schema( {} ) )

    return mongoose

}
