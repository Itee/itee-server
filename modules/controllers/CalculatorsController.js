/**
 * Created by tvalcke on 29/10/2015.
 */

if( !require("mongoose").modelSchemas['Calculator'] ) {
    console.log("My Calculator schema need to be register before !")
} else {

    var requester             = require('request'),
        wol                   = require('wake_on_lan'),
        Calculator            = require("mongoose").model('Calculator'),
        i                     = require('./ReturnModule'),
        CalculatorsController = (function () {

            var _instance = null;

            // Constructor
            function createInstance() {

                /**
                 * PRIVATE METHODS
                 */
                function __checkIdParam(idName, request, response) {

                    if (!request.params) {
                        i.returnError({
                            title:   'Erreur de paramètre',
                            message: 'Le calculateur n\'a reçu aucun paramètre !'
                        }, response);
                    }
                    if (!request.params[idName]) {
                        i.returnError({
                            title:   'Erreur de paramètre',
                            message: 'L\'id de calculateur est null !'
                        }, response);
                    }

                    return request.params[idName];

                }

                function __mergeProperties(jsonData, dataBaseObject) {

                    for (var property in jsonData) {
                        if (jsonData.hasOwnProperty(property) && dataBaseObject._doc.hasOwnProperty(property)) {
                            dataBaseObject[property] = jsonData[property];
                        }
                    }

                }

                function _requestCalculator(calculator, response) {

                    requester
                        .get('http://' + calculator.ipv4 + ':' + calculator.port + '/infos')
                        .on('error', i.return(response, {
                            'returnError': function (error) {

                                calculator.state = 'error';
                                //calculator._doc.calculator_errors = calculator._doc.calculator_errors.concat(error);
                                calculator.save(i.return(response, {
                                    'returnData': function (savedCalculator) {
                                        i.returnErrorAndData({
                                            title:   'Calculateur hors ligne',
                                            message: 'Impossible de joindre le calculateur ' + calculator.hostname + ' (' + calculator.ipv4 + ')'
                                        }, savedCalculator, response)
                                    }
                                }));

                            }
                        }))
                        .on('response', function (remoteResponse) { //TODO: i.return

                            if (remoteResponse.statusCode !== 200) {

                                calculator.state = 'down';
                                calculator.calculator_errors.push({message: calculator.ipv4 + ' n\'est pas fonctionnel !'});
                                calculator.save(i.return(response, {
                                    'returnData': function (savedCalculator) {
                                        i.returnErrorAndData({
                                            title:   'Erreur du calculateur',
                                            message: calculator.ipv4 + ' n\'est pas fonctionnel !'
                                        }, savedCalculator, response)
                                    }
                                }));

                            } else {

                                var dataBuffer = '';
                                remoteResponse.on('data', function (chunk) {
                                    dataBuffer += chunk.toString();
                                });

                                remoteResponse.on('end', function () {

                                    var parsedBuffer = JSON.parse(dataBuffer)[0];
                                    for (var property in parsedBuffer) {
                                        if (parsedBuffer.hasOwnProperty(property) && calculator._doc.hasOwnProperty(property)) {
                                            if (property !== '_id' && property !== '__v') calculator[property] = parsedBuffer[property];
                                        }
                                    }
                                    calculator.state             = 'up';
                                    calculator.calculator_errors = [];
                                    calculator.save(i.return(response));

                                });

                            }

                        });

                }

                function _wakeUpCalculator(numberOfCalculatorToWakeUp, response) {

                    var downCalculator         = _downCalculatorsList.shift(),
                        numberOfDownCalculator = _downCalculatorsList.length + 1;

                    if (numberOfDownCalculator < numberOfCalculatorToWakeUp) {
                        i.returnError({error: 'Impossible de reveiller plus de calculateurs que le nombre de calculateurs actuellement endormis !!!'}, response);
                        return;
                    }

                    console.log('Début du reveil du calculator: ' + downCalculator.hostname + '(' + downCalculator.ipv4 + ')');
                    try {

                        wol.wake(downCalculator.mac_address, function (error) {

                            if (error) {
                                _downCalculatorsList.push(downCalculator);
                                i.returnError(error, response);
                                return;
                            }

                            numberOfCalculatorToWakeUp--;
                            _availableCalculatorsList.push(downCalculator);

                            if (numberOfCalculatorToWakeUp > 0) {
                                console.log('Le nombre de calculateur à réveiller est toujours superieur à zéro...');
                                _wakeUpCalculator(numberOfCalculatorToWakeUp, response);
                            } else if (numberOfCalculatorToWakeUp === 0) {
                                console.log('Le nombre de calculateur à réveiller est égal à zéro');
                                i.returnData(null, response);
                            }

                        });

                    } catch (error) {
                        i.returnError(error, response);
                    }


                }

                /**
                 * PUBLIC METHODS
                 */
                function getAvailableCalculators(numberOfRequireCalculator, response) {

                    numberOfRequireCalculator = numberOfRequireCalculator || 0;

                    getAllCalculators(null, function (errorsList, checkedCalculators) {

                        if (checkedCalculators === null) {
                            errorsList.push({
                                title:   'Reservation de Calculateur',
                                message: 'Impossible d\'obtenir la liste des calculateurs !!!'
                            });
                            i.returnError(errorsList, response);
                        }

                        var numberOfCalculators          = checkedCalculators.length,
                            availableCalculators         = checkedCalculators.filter(function (checkedCalculator) {
                                return checkedCalculator.state === 'up'
                            }),
                            downCalculators              = checkedCalculators.filter(function (checkedCalculator) {
                                return checkedCalculator.state !== 'up'
                            }),
                            numberOfAvailableCalculators = (availableCalculators) ? availableCalculators.length : 0,
                            requiredNumberOfCalculator   = (numberOfRequireCalculator === 0) ? numberOfCalculators : numberOfRequireCalculator,
                            _errorsList                  = errorsList || [];

                        if (numberOfAvailableCalculators === 0) {

                            _errorsList.push({
                                title:   'Reservation de Calculateur',
                                message: 'Impossible d\'affecter les calculateurs demander, aucun calculateur est disponible pour le moment !'
                            });
                            i.returnError(_errorsList, response);

                        } else if (requiredNumberOfCalculator > numberOfAvailableCalculators) {

                            if (numberOfAvailableCalculators === 1) {

                                _errorsList.push({
                                    title:   'Reservation de Calculateur',
                                    message: 'Impossible d\'affecter la totalité du nombre de calculateurs demander, seulement ' + numberOfAvailableCalculators + ' calculateur est disponible pour la mission !'
                                });

                            } else {

                                _errorsList.push({
                                    title:   'Reservation de Calculateur',
                                    message: 'Impossible d\'affecter la totalité du nombre de calculateurs demander, seulement ' + numberOfAvailableCalculators + ' calculateurs sont disponible pour la mission !'
                                });

                            }

                            i.returnErrorAndData(_errorsList, availableCalculators, response);

                        } else {
                            var wantedAvailableCalculators = availableCalculators.slice(0, requiredNumberOfCalculator);
                            i.returnData(wantedAvailableCalculators, response);
                        }

                    });

                }

                /**
                 * REST API
                 */
                function getAllCalculators(request, response) {

                    Calculator.find(i.return(response, {
                        'returnNotFound': function () {
                            i.returnData([], response);
                        },
                        'returnData':     function (calculators) {

                            var calculatorList      = [],
                                errorsList          = [],
                                calculatorResponses = 0;

                            for (var calculatorIndex = 0, numberOfCalculators = calculators.length; calculatorIndex < numberOfCalculators; calculatorIndex++) {
                                var calculator = calculators[calculatorIndex];
                                _requestCalculator(calculator, i.return(response, {
                                    'returnForAll': function (error, requestedCalculator) {
                                        if (error) {
                                            errorsList = errorsList.concat(error)
                                        }
                                        if (requestedCalculator) {
                                            calculatorList = calculatorList.concat(requestedCalculator)
                                        }
                                        checkEndOfAllRequests(i.return(response));
                                    }
                                }));
                            }

                            function checkEndOfAllRequests(sendResult) {
                                if (++calculatorResponses === numberOfCalculators) {
                                    sendResult(errorsList, calculatorList);
                                }
                            }

                        }
                    }));

                }

                function createNewCalculator(request, response) {
                    var newCalculator = new Calculator(request.body);
                    newCalculator.save(i.return(response));
                }

                function getCalculatorWithId(request, response) {

                    /// TODO check why calculator
                    var calculatorId = __checkIdParam('calculatorId', request, response);
                    Calculator.findById(calculatorId, i.return(response, {
                        'returnData': function (calculator) {
                            _requestCalculator(calculator, i.return(response));
                        }
                    }));

                }

                function updateCalculatorWithId(request, response) {

                    var calculatorId = __checkIdParam('calculatorId', request, response);
                    Calculator.findById(calculatorId, i.return(response, {
                        'returnData': function (calculator) {

                            __mergeProperties(request.body, calculator);
                            calculator.save(i.return(response));

                        }
                    }));

                }

                function deleteCalculatorWithId(request, response) {

                    var calculatorId = __checkIdParam('calculatorId', request, response);
                    Calculator.findByIdAndRemove(calculatorId, i.return(response));

                }


                // Return the public interface
                return {
                    getAllCalculators:       getAllCalculators,
                    createNewCalculator:     createNewCalculator,
                    getCalculatorWithId:     getCalculatorWithId,
                    updateCalculatorWithId:  updateCalculatorWithId,
                    deleteCalculatorWithId:  deleteCalculatorWithId,
                    getAvailableCalculators: getAvailableCalculators
                };
            }

            return {
                getInstance: function () {
                    if (!_instance) {
                        _instance = createInstance();
                    }
                    return _instance;
                }
            };

        })();

    module.exports = CalculatorsController.getInstance();

}
