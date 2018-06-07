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
 * This module add the WorldCell schema to the database.
 * @module Database/Schemas/WorldCell
 *
 * @author Tristan Valcke <valcke.tristan@gmail.com>
 * @license LGPLv3
 *
 */

/**
 * This module add the WorldCell schema to the database.
 * @param mongoose - The mongoose driver database to extend
 * @returns {*} - The extended mongoose driver
 */
module.exports = function (mongoose) {
  
  var schemaTypes = mongoose.Schema.Types

  var imageSchema = mongoose.Schema({
    coordinates: {
      x: schemaTypes.Double,
      y: schemaTypes.Double,
      z: schemaTypes.Double
    },
    orientation: {
      x: schemaTypes.Double,
      y: schemaTypes.Double,
      z: schemaTypes.Double
    },
    thumbnail: Buffer,
    path: String
  }, { _id: false, id: false })

  var cameraPositionReferenceSchema = mongoose.Schema({
    coordinates: {
      x: schemaTypes.Double,
      y: schemaTypes.Double,
      z: schemaTypes.Double
    },
    images: [ imageSchema ]
  }, { _id: false, id: false })

  var pointCloudReferenceSchema = mongoose.Schema({
    coordinates: {
      x: Number,
      y: Number,
      z: Number
    },
    id: schemaTypes.ObjectId
  }, { _id: false, id: false })

  var meshReferenceSchema = mongoose.Schema( {
    id:          schemaTypes.ObjectId,
    coordinates: {
      x: Number,
      y: Number,
      z: Number
    },
    layer:       Number
  }, {
    _id: false,
    id:  false
  } )

  var worldCellSchema = mongoose.Schema( {
    lambertCoordinates: {
      x: schemaTypes.Double,
      y: schemaTypes.Double,
      z: schemaTypes.Double
    },
    boundingBox:        {
      xMin: Number,
      xMax: Number,
      yMin: Number,
      yMax: Number,
      zMin: Number,
      zMax: Number
    },
    cameraPath:         [ cameraPositionReferenceSchema ],
    cubeDataPoint:      [ pointCloudReferenceSchema ],
    meshes:             [ meshReferenceSchema ],
  } )

  mongoose.model('WorldCell', worldCellSchema)

  return mongoose
}
