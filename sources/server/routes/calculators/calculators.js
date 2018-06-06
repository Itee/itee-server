/**
 * Created by tvalcke on 29/09/2015.
 */

/**
 * MODULES
 */
var express               = require('../../node_modules/express'),
    router                = express.Router({mergeParams: true}),
    calculatorsController = require('../../modules/CalculatorsController.js');

/**
 * ROUTER
 */
if(Object.keys(calculatorsController).length > 0){

    console.log("Valid calculatorsController");

    router
        .get('/', calculatorsController.getAllCalculators)
        .post('/', calculatorsController.createNewCalculator)
        .get('/:calculatorId', calculatorsController.getCalculatorWithId)
        .put('/:calculatorId', calculatorsController.updateCalculatorWithId)
        .delete('/:calculatorId', calculatorsController.deleteCalculatorWithId);

} else {
    console.log("Invalid calculatorsController");
}

module.exports = router;
