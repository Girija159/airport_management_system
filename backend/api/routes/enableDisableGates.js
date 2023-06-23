const express = require('express');

const authentication = require('../middleware/authentication');
const enableDisableGatesController = require('../controllers/enableDisableGatesController');

const router = express.Router();

/**
 * Route for fetching terminal gates based on city
 */
router.get('/:city', (request, response, next) => {
    console.log("Route for fetching terminal gates based on city", request.params.city);
    
    enableDisableGatesController.fetchTerminalsGates(request, response);
});

/**
 * Route for disabling terminal gate for id
 */
router.post('/disable/:id/:terminalgate', (request, response, next) => {
    console.log("Route for disabling terminal gate for id", request.params.id, request.params.terminalgate);
    
    enableDisableGatesController.disableTerminalsGatesWithId(request, response);
});

/**
 * Route for enabling terminal gate for id
 */
router.post('/enable/:id/:terminalgate', (request, response, next) => {
    console.log("Route for enabling terminal gate for id", request.params.id, request.params.terminalgate);
    
    enableDisableGatesController.enableTerminalsGatesWithId(request, response);
});

module.exports = router;