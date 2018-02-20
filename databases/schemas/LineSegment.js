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

module.exports = function ( mongoose ) {

    var schemaTypes = mongoose.Schema.Types

    var LineSegmentSchema = mongoose.Schema( {
            uuid:                   String,
            name:                   String,
            type:                   String,
            parent:                 schemaTypes.ObjectId,
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
            geometry:               {
                type: schemaTypes.ObjectId,
                ref:  'Geometry'
            },
            material:               [{
                type: schemaTypes.ObjectId,
                ref:  'LineBasicMaterial'
            }],
            drawMode:               Number
        },
        {
            collection: 'objects',
            //            discriminatorKey: '_type'
        } )

    mongoose.model( 'LineSegment', LineSegmentSchema )

    return mongoose

}
