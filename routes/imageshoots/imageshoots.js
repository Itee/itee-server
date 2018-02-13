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
 * This module add routes for CloudPoint using the CloudPointController on request
 * @module Routes/CloudPoints
 *
 * @author Tristan Valcke <valcke.tristan@gmail.com>
 * @license LGPLv3
 *
 */


/*
 * MODULES
 */
var express    = require( '../../node_modules/express' )
var router     = express.Router( { mergeParams: true } )
var controller = require( '../../modules/databasecontrollers/ImageShootsDatabaseController.js' )

/*
 * ROUTER
 */
router
    .post( '/', controller.create )
    .get( '/', controller.read )
    .put( '/', controller.update )
    .delete( '/', controller.delete )
    .post( '/:id', controller.createOne )
    .get( '/:id', controller.readOne )
    .put( '/:id', controller.updateOne )
    .delete( '/:id', controller.deleteOne )
    .all( '/', function ( request, response ) {
        response.status( 404 ).end()
    } )

module.exports = router
