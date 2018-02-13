/**
 * Created by tvalcke on 29/10/2015.
 */

/** DATABASE & MODEL **/
var Project            = require("mongoose").model('Project'),
    i                  = require('./ReturnModule'),
    ProjectsController = (function() {

        var _instance = null;

        // Constructor
        function createInstance() {

            /**
             * PRIVATE METHODS
             */
            function __checkIdParam( idName, request, response ) {

                if ( !request.params ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'Le projet n\'a reçu aucun paramètre !'
                    }, response);
                }
                if ( !request.params[ idName ] ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'L\'id du projet est null !'
                    }, response);
                }

                return request.params[ idName ];

            }

            function __mergeProperties( jsonData, dataBaseObject ) {

                for ( var property in jsonData ) {
                    if ( jsonData.hasOwnProperty(property) && dataBaseObject._doc.hasOwnProperty(property) ) {
                        dataBaseObject[ property ] = jsonData[ property ];
                    }
                }

            }

            function _removeJobsForProject( projectToRemove, response ) {

                var JobsController = require('./JobsController.js'),
                    jobsToRemove   = projectToRemove.jobs,
                    numberOfJobs   = jobsToRemove.length,
                    errorsList     = [],
                    jobsResponses  = 0;

                for ( var jobIndex = 0 ; jobIndex < numberOfJobs ; jobIndex++ ) {

                    var jobToRemove = jobsToRemove[ jobIndex ],
                        params      = {
                            params: {
                                projectId: projectToRemove.id,
                                jobId:     jobToRemove.id
                            }
                        };

                    JobsController.deleteJobWithId(params, i.return(response, {
                        'returnForAll': function( error ) {
                            if ( error ) { errorsList = errorsList.concat(error); }
                            checkEndOfAllRequests(i.return(response));
                        }
                    }));

                    function checkEndOfAllRequests( sendResult ) {
                        if ( ++jobsResponses === numberOfJobs ) {
                            sendResult(errorsList);
                        }
                    }

                }

            }

            /**
             * PUBLIC METHODS
             */

            /**
             * REST API
             */
            function getAllProjects( request, response ) {
                Project.find(i.return(response, {
                    'returnNotFound': function() {
                        i.returnData([], response);
                    }
                }));
            }

            function createNewProject( request, response ) {
                var newProject = new Project(request.body);
                newProject.save(i.return(response));
            }

            function getProjectWithId( request, response ) {
                var projectId = __checkIdParam('projectId', request, response);
                Project.findById(projectId, i.return(response));
            }

            function updateProjectWithId( request, response ) {
                var projectId = __checkIdParam('projectId', request, response);
                Project.findById(projectId, i.return(response, {
                    'returnData': function( project ) {
                        __mergeProperties(request.body, project);
                        project.save(i.return(response));
                    }
                }));
            }

            function deleteProjectWithId( request, response ) {
                var projectId = __checkIdParam('projectId', request, response);
                Project.findById(projectId, i.return(response, {
                    'returnData': function( projectToRemove ) {

                        var _request = {
                            params: {
                                projectId: projectId
                            }
                        };

                        if ( projectToRemove.jobs.length > 0 ) {
                            _removeJobsForProject(projectToRemove, i.return(response, {
                                'returnError':    function( errors ) {
                                    _request.body = {
                                        state:      'error',
                                        job_errors: errors
                                    };
                                    updateProjectWithId(_request, i.return(response));
                                },
                                'returnNotFound': function() {
                                    deleteProjectWithId(request, response);
                                }
                            }));
                        } else {
                            projectToRemove.remove();
                            i.returnNotFound(response);
                        }
                    }
                }));
            }

            // Return the public interface
            return {
                getAllProjects:      getAllProjects,
                createNewProject:    createNewProject,
                getProjectWithId:    getProjectWithId,
                updateProjectWithId: updateProjectWithId,
                deleteProjectWithId: deleteProjectWithId
            };
        }

        return {
            getInstance: function() {
                if ( !_instance ) {
                    _instance = createInstance();
                }
                return _instance;
            }
        };

    })();

module.exports = ProjectsController.getInstance();
