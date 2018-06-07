/**
 * Created by tvalcke on 29/10/2015.
 */

var Job            = require('mongoose').model('Job'),
    i              = require('./ReturnModule'),
    JobsController = (function() {

        var _instance = null;

        // Constructor
        function createInstance() {

            /**
             * JOB MIDDLEWARE
             */
            Job.schema.pre('save', function( next ) {

                var totalAdvancement   = 0,
                    totalAllowedServer = 0,
                    tasksList          = this.tasks,
                    numberOfTasks      = tasksList.length;

                for ( var taskIndex = 0 ; taskIndex < numberOfTasks ; taskIndex++ ) {
                    var task = tasksList[ taskIndex ];
                    totalAdvancement += task.advancement;

                    if ( task.state === 'initial' || task.state === 'running' ) {
                        totalAllowedServer++;
                    }
                }

                this.advancement    = (numberOfTasks > 0) ? Math.round(totalAdvancement / numberOfTasks * 100) / 100 : 0;
                this.allowed_server = totalAllowedServer;

                next();

            });

            /**
             * PRIVATE METHODS
             */
            function __checkIdParam( idName, request, response ) {

                if ( !request.params ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'La mission n\'a reçu aucun paramètre !'
                    }, response);
                    return;
                }

                if ( !request.params[ idName ] ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'L\'id de la mission est null !'
                    }, response);
                    return;
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

            function __getParentProject( request, response, callback ) {

                var ProjectController = require('./ProjectsController');
                ProjectController.getProjectWithId(request, i.return(response, {
                    'returnData': callback
                }));

            }

            function __getJob( request, response, project, callback ) {

                var jobId        = __checkIdParam('jobId', request, response),
                    requestedJob = project.jobs.id(jobId);

                if ( requestedJob === null ) {
                    i.returnNotFound(response);
                    return;
                }

                callback(requestedJob, jobId);

            }

            function _dispatchTasksForJob( job, response ) {

                var TasksController       = require('./TasksController.js'),
                    CalculatorsController = require('./CalculatorsController.js');

                CalculatorsController.getAvailableCalculators(job.allowed_server, i.return(response, {
                    'returnNotFound':     function() {
                        i.returnError({message: 'Impossible de trouver des calculateurs disponibles à affecter à la mission !'}, response)
                    },
                    'returnErrorAndData': function( errorsList, availableCalculators ) {

                        switch ( job.type_of_job ) {
                            case 'git':
                                TasksController.dispatchGitTask(job, availableCalculators, i.return(response, {
                                    'returnData':         function( tasks ) {
                                        i.returnErrorAndData(errorsList, tasks, response);
                                    },
                                    'returnError':        function( errors ) {
                                        errorsList = errorsList.concat(errors);
                                        i.returnError(errorsList, response);
                                    },
                                    'returnErrorAndData': function( errors, tasks ) {
                                        errorsList = errorsList.concat(errors);
                                        i.returnErrorAndData(errorsList, tasks, response);
                                    }
                                }));
                                break;
                            case 'blender':
                                TasksController.dispatchBlenderTask(job, availableCalculators, i.return(response, {
                                    'returnData':         function( tasks ) {
                                        i.returnErrorAndData(errorsList, tasks, response);
                                    },
                                    'returnError':        function( errors ) {
                                        errorsList = errorsList.concat(errors);
                                        i.returnError(errorsList, response);
                                    },
                                    'returnErrorAndData': function( errors, tasks ) {
                                        errorsList = errorsList.concat(errors);
                                        i.returnErrorAndData(errorsList, tasks, response);
                                    }
                                }));
                                break;
                            case 'tuileur':
                                TasksController.dispatchTuileurTask(job, availableCalculators, i.return(response, {
                                    'returnData':         function( tasks ) {
                                        i.returnErrorAndData(errorsList, tasks, response);
                                    },
                                    'returnError':        function( errors ) {
                                        errorsList = errorsList.concat(errors);
                                        i.returnError(errorsList, response);
                                    },
                                    'returnErrorAndData': function( errors, tasks ) {
                                        errorsList = errorsList.concat(errors);
                                        i.returnErrorAndData(errorsList, tasks, response);
                                    }
                                }));
                                break;
                            default:
                                errorsList = errorsList.concat({
                                    title:   'Mission X',
                                    message: 'Impossible de dispatcher la tache, le type de job est inconnu...'
                                });
                                i.returnError(errorsList, response);
                                break;
                        }

                    },
                    'returnData':         function( availableCalculators ) {

                        switch ( job.type_of_job ) {
                            case 'git':
                                TasksController.dispatchGitTask(job, availableCalculators, i.return(response));
                                break;
                            case 'blender':
                                TasksController.dispatchBlenderTask(job, availableCalculators, i.return(response));
                                break;
                            case 'tuileur':
                                TasksController.dispatchTuileurTask(job, availableCalculators, i.return(response));
                                break;
                            default:
                                i.returnError({
                                    title:   'Mission X',
                                    message: 'Impossible de dispatcher la tache, le type de mission est inconnu...'
                                }, response);
                                break;
                        }

                    }
                }));

            }

            function _removeTasksForJob( job, response ) {

                var TasksController = require('./TasksController.js'),
                    tasksToRemove   = job.tasks,
                    numberOfTask    = tasksToRemove.length,
                    errorsList      = [],
                    tasksResponses  = 0;

                for ( var taskIndex = 0 ; taskIndex < numberOfTask ; taskIndex++ ) {

                    var taskToRemove = tasksToRemove[ taskIndex ],
                        params       = {
                            params: {
                                projectId: job.__parent.id,
                                jobId:     job.id,
                                taskId:    taskToRemove.id
                            }
                        };

                    TasksController.deleteTaskWithId(params, i.return(response, {
                        'returnForAll': function( error ) {
                            if ( error ) { errorsList = errorsList.concat(error); }
                            checkEndOfAllRequests(i.return(response));
                        }
                    }));

                }

                function checkEndOfAllRequests( sendResult ) {
                    if ( ++tasksResponses === numberOfTask ) {
                        sendResult(errorsList);
                    }
                }

            }

            /**
             * PUBLIC METHODS
             */

            /**
             * REST API
             */

            function getAllJobs( request, response ) {

                __getParentProject(request, response, function( project ) {

                    i.returnData(project.jobs, response);

                });

            }

            function createNewJob( request, response ) {

                __getParentProject(request, response, function( project ) {

                    var data        = request.body;
                    data.project_id = project.id;

                    var newJob = new Job(data),
                        jobId  = newJob.id;

                    project.jobs.push(newJob);
                    project.save(i.return(response, {
                        'returnData': function( savedProject ) {

                            var tempSavedJob = savedProject.jobs.id(jobId);
                            _dispatchTasksForJob(tempSavedJob, i.return(response, {
                                'returnData':         function( tasks ) {

                                    __getParentProject(request, response, function( projectUpToDate ) {
                                        var finalSavedJob   = projectUpToDate.jobs.id(jobId);
                                        finalSavedJob.tasks = tasks;
                                        projectUpToDate.save(i.return(response));
                                    });

                                },
                                'returnErrorAndData': function( errors, tasks ) {

                                    __getParentProject(request, response, function( projectUpToDate ) {
                                        var finalSavedJob   = projectUpToDate.jobs.id(jobId);
                                        finalSavedJob.tasks = tasks;
                                        projectUpToDate.save(i.return(response, {
                                            'returnData': function( savedProject ) {
                                                i.returnErrorAndData(errors, savedProject.jobs.id(jobId), response);
                                            }
                                        }));
                                    });

                                },
                                'returnError':        function( errors ) {

                                    __getParentProject(request, response, function( projectUpToDate ) {
                                        var finalSavedJob = projectUpToDate.jobs.id(jobId);
                                        finalSavedJob.remove();
                                        projectUpToDate.save(i.return(response, {
                                            'returnData': function( pro ) {
                                                i.returnError(errors, response);
                                            }
                                        }));
                                    });

                                }
                            }));

                        }
                    }));


                });

            }

            function getJobWithId( request, response ) {

                __getParentProject(request, response, function( project ) {
                    __getJob(request, response, project, function( job ) {

                        i.returnData(job, response);

                    });
                });

            }

            function updateJobWithId( request, response ) {

                __getParentProject(request, response, function( project ) {
                    __getJob(request, response, project, function( job, jobId ) {

                        __mergeProperties(request.body, job);
                        project.save(i.return(response, {
                            'returnData': function( savedProject ) {
                                i.returnData(savedProject.jobs.id(jobId), response);
                            }
                        }));

                    });
                });

            }

            function stopJobWithId( request, response ) {

                __getParentProject(request, response, function( project ) {
                    __getJob(request, response, project, function( job, jobId ) {

                        var _request = {
                            params: {
                                projectId: project.id,
                                jobId:     jobId
                            }
                        };

                        if ( job.tasks.length > 0 ) {

                            _removeTasksForJob(job, i.return(response, {
                                'returnError':    function( errors ) {
                                    _request.body = {
                                        state:      'error',
                                        job_errors: errors
                                    };
                                    updateJobWithId(_request, i.return(response));
                                },
                                'returnNotFound': function() {
                                    _request.body = {
                                        state: 'stopping'
                                    };
                                    updateJobWithId(_request, i.return(response));
                                }
                            }));

                        } else {

                            _request.body = {
                                state: 'stopping'
                            };
                            updateJobWithId(_request, i.return(response));

                        }

                    });
                });

            }

            function deleteJobWithId( request, response ) {

                __getParentProject(request, response, function( project ) {
                    __getJob(request, response, project, function( job, jobId ) {

                        if ( job.tasks.length > 0 ) {

                            _removeTasksForJob(job, i.return(response, {
                                'returnError':    function( errors ) {
                                    var _request = {
                                        params: {
                                            projectId: project.id,
                                            jobId:     jobId
                                        },
                                        body:   {
                                            state:      'error',
                                            job_errors: errors
                                        }
                                    };
                                    updateJobWithId(_request, i.return(response, {
                                        'returnData': function() {
                                            i.returnError({
                                                title:   'Erreur de suppression',
                                                message: 'Impossible de supprimer la mission (' + job.name + ')'
                                            }, response);
                                        }
                                    }));
                                },
                                'returnNotFound': function() {
                                    job.remove();
                                    project.save(i.return(response, {
                                        'returnData': function() {
                                            i.returnNotFound(response);
                                        }
                                    }));
                                }
                            }));

                        } else {
                            job.remove();
                            project.save(i.return(response, {
                                'returnData': function() {
                                    i.returnNotFound(response);
                                }
                            }));
                        }

                    });
                });

            }

            // Return the public interface
            return {
                getAllJobs:      getAllJobs,
                createNewJob:    createNewJob,
                getJobWithId:    getJobWithId,
                updateJobWithId: updateJobWithId,
                stopJobWithId:   stopJobWithId,
                deleteJobWithId: deleteJobWithId
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

module.exports = JobsController.getInstance();
