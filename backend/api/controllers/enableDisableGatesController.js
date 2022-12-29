const axios = require('axios');

const terminalsGates = require('../models/terminalsGates');

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * Fetch terminals and gates based on city
 */
 exports.fetchTerminalsGates = (request, response) => {
    axios.get(`${process.env.BASE_URL}/terminalgates/${request.params.city}`)
    .then(result => {
        console.log("Fetch terminals and gates based on city in fetchTerminalsGates", request.params.city);
        
        response.status(200).json(result.data);
    })
    .catch(error => {
        console.log("Error fetching terminals and gates based on city in fetchTerminalsGates", error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * @param {Object} result
 * 
 * Disable terminal gate based on id
 */
const disableTerminalGate = (request, response, result) => {
    result.disabledgates.push(request.params.terminalgate);
    terminalsGates.findByIdAndUpdate(request.params.id, result, {new: true})
    .exec()
    .then(updatedAirport => {
        console.log("Disable terminal gate based on id in disableTerminalGate", updatedAirport);
        
        result = updatedAirport;
    })
    .catch(error => {
        console.log("Error disabling terminal gate based on id in disableTerminalGate", error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * @param {Object} result
 * 
 * Enable terminal gate based on id
 */
const enableTerminalGate = (request, response, result) => {
    result.disabledgates.splice(result.disabledgates.indexOf(request.params.terminalgate), 1);
    console.log(result.disabledgates);
    terminalsGates.findByIdAndUpdate(request.params.id, result, {new: true})
    .exec()
    .then(updatedAirport => {
        console.log("Enable terminal gate based on id in enableTerminalGate", updatedAirport);
        
        result = updatedAirport;
    })
    .catch(error => {
        console.log("Error enabling terminal gate based on id in enableTerminalGate", error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * Fetch terminal gates by id and make API call to disable
 */
exports.disableTerminalsGatesWithId = (request, response) => {
    terminalsGates.findById(request.params.id)
    .exec()
    .then(result => {
        console.log("Disable terminal gate API call in disableTerminalGatesWithId", result);
        
        disableTerminalGate(request, response, result);

        response.status(200).json(result);
    })
    .catch(error => {
        console.log("Error disabling terminal gate API call in disableTerminalGatesWithId", error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 * 
 * Fetch terminal gates by id and make API call to enable
 */
exports.enableTerminalsGatesWithId = (request, response) => {
    terminalsGates.findById(request.params.id)
    .exec()
    .then(result => {
        enableTerminalGate(request, response, result);

        response.status(200).json(result);
        console.log("Enable terminal gate API call in enableTerminalGatesWithId", result);
    })
    .catch(error => {
        response.status(500).json(error);
        console.log("Error enabling terminal gate API call in enableTerminalGatesWithId", error);
    });
};