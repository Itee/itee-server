/**
 * Created by tvalcke on 29/09/2015.
 */

/**
 * MODULES
 */
var express            = require('../../node_modules/express'),
    router             = express.Router({mergeParams: true}),
    projectsController = require('../../modules/ProjectsController.js');

/**
 * ROUTER
 */
router
    .get('/', projectsController.getAllProjects)
    .post('/', projectsController.createNewProject)
    .get('/:projectId', projectsController.getProjectWithId)
    .put('/:projectId', projectsController.updateProjectWithId)
    .delete('/:projectId', projectsController.deleteProjectWithId)
    .all('/', function( request, response ) {
        response.status(404).end();
    });

module.exports = router;
