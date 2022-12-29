const express = require('express');

const terminalGatesController = require('../controllers/terminalGatesController');

const router = express.Router();

/**
 * Route for fetching terminals and gates
 */
router.get('/', (request, response, next) => {
    console.log("Route for fetching terminals and gates");
    
    terminalGatesController.getTerminalGate(request, response);
});

/**
 * Route for assigning terminal and gate randomly
 */
router.post('/', (request, response, next) => {
    console.log("Route for assigning terminal and gate randomly");
    
    terminalGatesController.fetchTerminalsGates(request, response);
});

/**
 * Route for fetching terminals with city
 */
router.get('/:city', (request, response, next) => {
    console.log("Route for fetching terminals with city", request.params.city);
    
    terminalGatesController.getTerminalGateWithCity(request, response);
});

module.exports = router;