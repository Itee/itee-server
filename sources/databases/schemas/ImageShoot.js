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
 * This module add the PointCloud schema to the database.
 * @module Database/Schemas/PointCloud
 *
 * @author Tristan Valcke <valcke.tristan@gmail.com>
 * @license LGPLv3
 *
 */


module.exports = function (mongoose) {

    var schemaTypes = mongoose.Schema.Types

    var imageShootSchema = mongoose.Schema({
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
    
    mongoose.model('ImageShoot', imageShootSchema)

    return mongoose

}
