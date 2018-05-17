/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
/**
 * Created by Tristan on 21/10/2017.
 */

const Color = require( '../math/Color' )
const Fog   = require( './Fog' )

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

    const ColorSchema = Color.getSchemaFrom( Mongoose )
    const FogSchema   = Fog.getSchemaFrom( Mongoose )
    const Schema      = Mongoose.Schema
    const Types       = Schema.Types
    const ObjectId    = Types.ObjectId
    const Mixed       = Types.Mixed

    _schema = new Schema( {
        uuid:                   String,
        name:                   String,
        type:                   String,
        parent:                 ObjectId,
        children:               [ ObjectId ],
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
        userData:               Mixed,
        // Specific
        background:             ColorSchema,
        fog:                    FogSchema,
        overrideMaterial:       String,
        autoUpdate:             Boolean
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

    _model = Mongoose.model( 'SceneAlt', getSchemaFrom( Mongoose ) )

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
