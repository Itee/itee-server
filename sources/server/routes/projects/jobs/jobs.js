/**
 * Created by tvalcke on 29/10/2015.
 */

/**
 * MODULES
 */
var express        = require('../../../node_modules/express'),
    router         = express.Router({mergeParams: true}),
    jobsController = require('../../../modules/JobsController.js');

/**
 * ROUTER
 */
router
    .get('/', jobsController.getAllJobs)
    .post('/', jobsController.createNewJob)
    .get('/:jobId', jobsController.getJobWithId)
    .put('/:jobId', jobsController.updateJobWithId)
    .patch('/:jobId', jobsController.stopJobWithId)
    .delete('/:jobId', jobsController.deleteJobWithId)
    .all('/', function( request, response ) {
        response.status(404).end();
    });

module.exports = router;
