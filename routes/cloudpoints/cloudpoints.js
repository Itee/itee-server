/**
 * Created by tvalcke on 28/09/2016.
 */


/**
 * MODULES
 */
var express  = require('../../node_modules/express'),
    router   = express.Router({mergeParams: true}),
    cloudPointController = require('../../modules/CloudPointController.js');

/**
 * ROUTER
 */
router
    .get('/', cloudPointController.getAllCloudPoint)
    .get('/:cloudId', cloudPointController.getCloudWithId)
    .get('/:cloudId/cubes/', cloudPointController.getAllCubePointForCloudWithId)
    .post('/:cloudId/cubes/', cloudPointController.getAllCubePointForCloudWithId)
    .post('/:cloudId/cubesmultisampled/', cloudPointController.getCubePointMultiSampled)
    .get('/:cloudId/cubes/:cubeId', cloudPointController.getCubePointWithIdForCloudWithId)
    .all('/', function( request, response ) {
        response.status(404).end();
    });

module.exports = router;
