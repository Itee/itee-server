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

    const Vector2Schema = Vector2.getSchemaFrom( Mongoose )
    const Schema        = Mongoose.Schema
    const Types         = Schema.Types
    const ObjectId      = Types.ObjectId

    _schema = new Schema( {
            uuid:             String,
            name:             String,
            image:            ObjectId,
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

    _model = Mongoose.model( 'Texture', getSchemaFrom( Mongoose ) )

    _inherit( Mongoose )

}

function _inherit ( Mongoose ) {
    'use strict'

    const Schema = Mongoose.Schema

    _model.discriminator( 'CanvasTexture', new Schema( {
        needsUpdate: Boolean
    } ) )

    _model.discriminator( 'CompressedTexture', new Schema( {} ) )

    _model.discriminator( 'CubeTexture', new Schema( {} ) )

    _model.discriminator( 'DataTexture', new Schema( {} ) )

    _model.discriminator( 'DepthTexture', new Schema( {} ) )

    _model.discriminator( 'VideoTexture', new Schema( {} ) )

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
