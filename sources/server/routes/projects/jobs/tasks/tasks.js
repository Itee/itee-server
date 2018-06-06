/**
 * Created by tvalcke on 29/10/2015.
 */

/**
 * MODULES
 */
var express         = require('../../../../node_modules/express'),
    router          = express.Router({mergeParams: true}),
    tasksController = require('../../../../modules/TasksController.js');

/**
 *  Tasks of job with id ... of project with id ...
 */
router
    .get('/', tasksController.getAllTasks)
    .post('/', tasksController.createNewTask)
    .get('/:taskId', tasksController.getTaskWithId)
    .put('/:taskId', tasksController.updateTaskWithId)
    .delete('/:taskId', tasksController.deleteTaskWithId)
    .all('/', function( request, response ) {
        response.status(404).end();
    });

module.exports = router;
