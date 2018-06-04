/**
 * Created by tvalcke on 05/10/2015.
 */

var requester       = require('request'),
    Task            = require("mongoose").model('Task'),
    i               = require('./ReturnModule'),
    TasksController = (function() {

        var _instance = null;

        function createInstance() {

            /**
             * PRIVATE METHODS
             */
            function __checkIdParam( idName, request, response ) {

                if ( !request.params ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'La tache n\'a reçu aucun paramètre !'
                    }, response);
                }
                if ( !request.params[ idName ] ) {
                    i.returnError({
                        title:   'Erreur de paramètre',
                        message: 'L\'id de la tache est null !'
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

            function __getParentJob( request, response, callback ) {

                var JobController = require('./JobsController');
                JobController.getJobWithId(request, i.return(response, {'returnData': callback}));

            }

            function __getTask( request, response, job, callback ) {

                var taskId        = __checkIdParam('taskId', request, response),
                    requestedTask = job.tasks.id(taskId);

                if ( requestedTask === null ) {
                    i.returnNotFound(response);
                    return;
                }

                callback(requestedTask, taskId);

            }

            function __getCalculator( calculatorId, response, callback ) {

                if ( calculatorId === null ) {
                    i.returnError("The calculator id can't be null or empty", response);
                    return;
                }

                var CalculatorsController = require('./CalculatorsController.js'),
                    _request              = {
                        params: {
                            calculatorId: calculatorId
                        }
                    };

                CalculatorsController.getCalculatorWithId(_request, i.return(response, {
                    'returnErrorAndData': function( error, data ) {
                        i.returnError(error, response);
                    },
                    'returnData':         callback
                }));

            }

            function _removeRemoteTaskForTask( task, response ) {

                __getCalculator(task.associate_calculator_id, response, function( calculator ) {

                    requester.del({
                        url: calculator.scheme + '://' + calculator.ipv4 + ':' + calculator.port + '/tasks/' + task.id
                    }, i.return(response, {
                        'returnData': function( calculatorResponse ) {
                            if ( calculatorResponse.statusCode !== 200 && calculatorResponse.statusCode !== 204 ) {
                                i.returnError({
                                    title:   'Error de Calculateur',
                                    message: calculatorResponse + ' est en erreur vis à vis de la tache envoyé !'
                                }, response);
                            } else {
                                i.returnNotFound(response);
                            }
                        }
                    }));

                });

            }

            function _sendRemoteTaskForTask( task, response ) {

                __getCalculator(task.associate_calculator_id, response, function( calculator ) {

                    requester.post({
                            url:  calculator.scheme + '://' + calculator.ipv4 + ':' + calculator.port + '/tasks/',
                            json: true,
                            body: task
                        }, i.return(response, {
                            'returnData': function( calculatorResponse ) {
                                if ( calculatorResponse.statusCode !== 200 ) {
                                    i.returnError({
                                        title:   'Error de Calculateur',
                                        message: calculatorResponse + ' est en erreur vis à vis de la tache envoyé !'
                                    }, response);
                                } else {
                                    i.returnNotFound(response);
                                }
                            }
                        })
                    );

                });

            }

            /**
             * PUBLIC METHODS
             */
            function dispatchGitTask( job, calculators, response ) {

                var numberOfCalculators = calculators.length,
                    errorsList          = [],
                    createdTasks        = [],
                    tasksResponses      = 0;

                for ( var calculatorIndex = 0 ; calculatorIndex < numberOfCalculators ; calculatorIndex++ ) {

                    var calculator = calculators[ calculatorIndex ],
                        params     = {
                            params: {
                                projectId: job.project_id,
                                jobId:     job.id
                            },
                            body:   {
                                project_id:              job.project_id,
                                job_id:                  job.id,
                                type_of_job:             job.type_of_job,
                                associate_calculator_id: calculator.get('id'),
                                options:                 {}
                            }
                        };

                    createNewTask(params, i.return(response, {
                        'returnForAll': function( error, newTask ) {
                            if ( error ) { errorsList = errorsList.concat(error); }
                            if ( newTask ) { createdTasks.push(newTask); }
                            checkEndOfAllRequests(i.return(response));
                        }
                    }));

                }

                function checkEndOfAllRequests( sendResult ) {
                    if ( ++tasksResponses === numberOfCalculators ) {
                        sendResult(errorsList, createdTasks);
                    }
                }

            }

            function dispatchTuileurTask( job, calculators, response ) {

                var numberOfCalculators  = calculators.length,
                    errorsList           = [],
                    createdTasks         = [],
                    tasksResponses       = 0,
                    fileToRenderList     = extractRenderFileList(job.options.render_file_location),
                    numberOfFileToRender = fileToRenderList.length,
                    fileIndex            = 0;

                //var calculatorIndex = 0;
                //for ( var fileToRenderIndex = 0 ; fileToRenderIndex <= numberOfFileToRender ; fileToRenderIndex++ ) {
                //
                //    if( ++calculatorIndex == numberOfCalculators)
                //    {
                //        calculatorIndex = 0;
                //    }
                //
                //    var calculator = calculators[ calculatorIndex ],
                //        requestParams     = {
                //            params: {
                //                projectId: job.project_id,
                //                jobId:     job.id
                //            },
                //            body:   {
                //                project_id:              job.project_id,
                //                job_id:                  job.id,
                //                associate_calculator_id: calculator.get('id'),
                //                type_of_job:             job.type_of_job,
                //                options:                 {
                //                    path_of_file_to_render: fileToRenderList[ fileToRenderIndex ]
                //                }
                //            }
                //        };
                //
                //    createNewTask(requestParams, i.return(response, {
                //        'returnForAll': function( error, newTask ) {
                //            if ( error ) { errorsList = errorsList.concat(error); }
                //            if ( newTask ) { createdTasks.push(newTask); }
                //            checkEndOfAllRequests(i.return(response));
                //        }
                //    }));
                //}

                // OR

                //for ( var calculatorIndex = 0 ; calculatorIndex <= numberOfCalculators ; calculatorIndex++ ) {
                //
                //    // Reset the current index in goal to send every file path to render
                //    if ( calculatorIndex == numberOfCalculators && fileIndex < numberOfFileToRender ) {
                //        calculatorIndex = 0;
                //    } else if ( fileIndex == numberOfFileToRender ) {
                //        break;
                //    }
                //
                //    var calculator = calculators[ calculatorIndex ],
                //        requestParams     = {
                //            params: {
                //                projectId: job.project_id,
                //                jobId:     job.id
                //            },
                //            body:   {
                //                project_id:              job.project_id,
                //                job_id:                  job.id,
                //                associate_calculator_id: calculator.get('id'),
                //                type_of_job:             job.type_of_job,
                //                options:                 {
                //                    path_of_file_to_render: fileToRenderList[ fileIndex ]
                //                }
                //            }
                //        };
                //
                //    createNewTask(requestParams, i.return(response, {
                //        'returnForAll': function( error, newTask ) {
                //            if ( error ) { errorsList = errorsList.concat(error); }
                //            if ( newTask ) { createdTasks.push(newTask); }
                //            checkEndOfAllRequests(i.return(response));
                //        }
                //    }));
                //
                //    fileIndex++;
                //
                //}

                // OR

                for ( var calculatorIndex = 0 ; calculatorIndex <= numberOfCalculators ; calculatorIndex++ ) {

                    // Reset the current index in goal to send every file path to render
                    if ( calculatorIndex == numberOfCalculators && fileIndex < numberOfFileToRender ) {
                        calculatorIndex = 0;
                    } else if ( fileIndex == numberOfFileToRender ) {
                        break;
                    }

                    var calculator = calculators[ calculatorIndex ],
                        newTask = new Task({
                            project_id:              job.project_id,
                            job_id:                  job.id,
                            associate_calculator_id: calculator.get('id'),
                            type_of_job:             job.type_of_job,
                            options:                 {
                                path_of_file_to_render: fileToRenderList[ fileIndex ]
                            }
                        });

                    requester.post({
                            url:  calculator.scheme + '://' + calculator.ipv4 + ':' + calculator.port + '/tasks/',
                            json: true,
                            body: newTask
                        }, i.return(response, {
                            'returnForAll': function( error, data ) {
                                i.returnError(error, response);
                            },
                            'returnData': function( calculatorResponse ) {
                                if ( calculatorResponse.statusCode !== 200 ) {
                                    i.returnError({
                                        title:   'Error de Calculateur',
                                        message: calculatorResponse + ' est en erreur vis à vis de la tache envoyé !'
                                    }, response);
                                } else {
                                    i.returnNotFound(response);
                                }
                            }
                        })
                    );

                    fileIndex++;
                }

                function checkEndOfAllRequests( sendResult ) {
                    if ( ++tasksResponses === numberOfFileToRender ) {
                        sendResult(errorsList, createdTasks);
                    }
                }

                function extractRenderFileList( file ) {
                    var resultArray = [],
                        tmpArray    = file.split("\r\n");

                    for ( var index = 0, arrayLength = tmpArray.length ; index < arrayLength ; index++ ) {
                        var value = tmpArray[ index ];
                        if ( value ) {
                            resultArray.push(value)
                        }
                    }
                    return resultArray;
                }
            }

            function dispatchBlenderTask( job, calculators, response ) {

                var numberOfAllowedCalculators = calculators.length,
                    errorsList                 = [],
                    createdTasks               = [],
                    tasksResponses             = 0,

                    startingImage              = (job.options.start_at_image) ? parseInt(job.options.start_at_image, 10) : 0,
                    endingImage                = (job.options.end_at_image) ? parseInt(job.options.end_at_image, 10) : 0,
                    totalFrame                 = (endingImage - startingImage) + 1,
                    imagesRange                = Math.floor(totalFrame / numberOfAllowedCalculators),
                    remainder                  = totalFrame % numberOfAllowedCalculators,
                    currentStartingImage       = startingImage,
                    currentEndingImage         = currentStartingImage + imagesRange;

                for ( var calculatorIndex = 0 ; calculatorIndex < numberOfAllowedCalculators ; calculatorIndex++ ) {

                    var calculator = calculators[ calculatorIndex ],
                        params     = {
                            params: {
                                projectId: job.project_id,
                                jobId:     job.id
                            },
                            body:   {
                                project_id:              job.project_id,
                                job_id:                  job.id,
                                associate_calculator_id: calculator.get('id'),
                                type_of_job:             job.type_of_job,
                                options:                 {
                                    render_file_location:   job.options.render_file_location,
                                    render_folder_location: job.options.render_folder_location,
                                    render_engine:          job.options.render_engine,
                                    render_extension:       job.options.render_extension,
                                    start_at_image:         currentStartingImage,
                                    end_at_image:           currentEndingImage,
                                    stepping:               job.stepping || 1
                                }
                            }
                        };

                    createNewTask(params, i.return(response, {
                        'returnForAll': function( error, newTask ) {
                            if ( error ) { errorsList = errorsList.concat(error); }
                            if ( newTask ) { createdTasks.push(newTask); }
                            checkEndOfAllRequests(i.return(response));
                        }
                    }));

                    if ( calculatorIndex === numberOfAllowedCalculators - 1 ) {
                        currentStartingImage = currentEndingImage + 1;
                        currentEndingImage   = currentEndingImage + imagesRange + remainder;
                    } else {
                        currentStartingImage = currentEndingImage + 1;
                        currentEndingImage   = currentEndingImage + imagesRange;
                    }

                }

                function checkEndOfAllRequests( sendResult ) {
                    if ( ++tasksResponses === numberOfAllowedCalculators ) {
                        sendResult(errorsList, createdTasks);
                    }
                }

            }

            /**
             * REST API
             */
            function getAllTasks( request, response ) {

                __getParentJob(request, response, function( job ) {

                    i.returnData(job.tasks, response);

                });

            }

            function createNewTask( request, response ) {

                __getParentJob(request, response, function( job ) {

                    var data        = request.body;
                    data.project_id = job.__parent.get('id');
                    data.job_id     = job.id;

                    var newTask = new Task(data);

                    job.tasks.push(newTask);
                    job.__parent.save(i.return(response, {
                        'returnData': function( savedProject ) {

                            var savedTask = savedProject.jobs.id(job.id).tasks.id(newTask.id);
                            _sendRemoteTaskForTask(savedTask, i.return(response, {
                                'returnNotFound': function() {
                                    i.returnData(savedTask, response);
                                }
                            }));

                        }
                    }))

                });

            }

            function getTaskWithId( request, response ) {

                __getParentJob(request, response, function( job ) {
                    __getTask(request, response, job, function( task ) {

                        i.returnData(task, response);

                    });
                });

            }

            function updateTaskWithId( request, response ) {

                __getParentJob(request, response, function( job ) {
                    __getTask(request, response, job, function( task, taskId ) {

                        __mergeProperties(request.body, task);
                        job.__parent.save(i.return(response, {
                            'returnData': function( updatedProject ) {

                                var updatedTask = updatedProject.jobs.id(job.id).tasks.id(taskId);
                                i.returnData(updatedTask, response);

                            }
                        }));

                    });
                });

            }

            function deleteTaskWithId( request, response ) {

                __getParentJob(request, response, function( job ) {
                    __getTask(request, response, job, function( task, taskId ) {

                        if ( task.associate_calculator_id ) {

                            _removeRemoteTaskForTask(task, i.return(response, {
                                'returnError':    function( errors ) {
                                    var _request = {
                                        params: {
                                            projectId: job.__parent.id,
                                            jobId:     job.id,
                                            taskId:    taskId
                                        },
                                        body:   {
                                            state:      'error',
                                            job_errors: errors
                                        }
                                    };
                                    updateTaskWithId(_request, i.return(response, {
                                        'returnData': function() {
                                            i.returnError({
                                                title:   'Erreur de suppression',
                                                message: 'Impossible de supprimer la tache (' + taskId + ')'
                                            }, response);
                                        }
                                    }));
                                },
                                'returnNotFound': function() {
                                    task.remove();
                                    job.__parent.save(i.return(response, {
                                        'returnData': function() {
                                            i.returnNotFound(response);
                                        }
                                    }));
                                }
                            }));

                        } else {
                            task.remove();
                            job.__parent.save(i.return(response, {
                                'returnData': function() {
                                    i.returnNotFound(response);
                                }
                            }));
                        }

                    });
                });

            }

            return {
                getAllTasks:      getAllTasks,
                createNewTask:    createNewTask,
                getTaskWithId:    getTaskWithId,
                updateTaskWithId: updateTaskWithId,
                deleteTaskWithId: deleteTaskWithId,

                dispatchGitTask:     dispatchGitTask,
                dispatchBlenderTask: dispatchBlenderTask,
                dispatchTuileurTask: dispatchTuileurTask
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

module.exports = TasksController.getInstance();
