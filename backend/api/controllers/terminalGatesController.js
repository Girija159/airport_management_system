const axios = require('axios');

const terminalsGates = require('../models/terminalsGates');

/**
 * 
 * @param {Integer} length 
 * @returns random integer with in the length
 */
 const randomTerminalAndGate = (length) => {
    console.log("Generate random integer with in the length in randomTerminalAndGate", length);

    let randomValue = Math.random() * length;

    return Math.floor(randomValue);
};

/**
 * 
 * @param {Number} value 
 * @returns Character
 */
const intToChar = (value) => {
    console.log("Int to Char in intToChar", value);

    const code = 'A'.charCodeAt(0);

    return String.fromCharCode(code + value);
}

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch terminals and gates based on source and destination 
 */
exports.getTerminalGate = (request, response) => {
    terminalsGates.find({
        'city': { $in: [request.query.source, request.query.destination]}
      }
    )
    .exec()
    .then(result => {
        console.log("Fetch terminals and gates based on source and destination in getTerminalGate", result);
        
        response.status(200).json(result);
    })
    .catch(error => {
        console.log("Error fetch terminals and gates based on source and destination in getTerminalGate", error);
        
        response.status(500).json(error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch terminals 
 */
exports.getTerminalGateWithCity = (request, response) => {
    terminalsGates.find({city: request.params.city})
    .exec()
    .then(document => {
        console.log("Fetch terminals in getTerminalGateWithCity", document);
        
        response.status(200).json(document);
    })
    .catch(error => {
        console.log("Error fetching terminals in getTerminalGateWithCity", error);

        response.status(500).json(error);
    });
};

/**
 * 
 * @param {String} city 
 * @param {Array} terminals
 * 
 * Update DB with assigned Terminal and gate 
 */
const updateTerminalGateInDB = (airport) => {
    terminalsGates.findByIdAndUpdate(airport._id, airport, {new: true})
    .exec()
    .then(document => {
        console.log("Update terminal gate in DB in updateTerminalGateInDB", document);
    })
    .catch(error => {
        console.log("Error updating terminal gate in DB in updateTerminalGateInDB", error);
    });
};

/**
 * 
 * @param {Object} request 
 * @param {Array} terminals 
 * @param {Boolean} isTerminalGateAssigned 
 * @param {String} city 
 * @param {String} gate 
 * 
 * Update DB with assigned terminal and gate
 * @returns request object updated assigned with random gate
 */
const generateRandomTerminalGate = (request, airport, isTerminalGateAssigned, gate, time) => {
    console.log("Generate random terminal and gate and update schedule in generateRandomTerminalGate", airport);

    let terminals = airport.terminals;
    let count = 0;

    while(!isTerminalGateAssigned && count <= terminals.length) {
        // console.log(gate);

        let randomTerminal = randomTerminalAndGate(terminals.length);
        let randomTerminalChar = intToChar(randomTerminal);
        let randomGate = randomTerminalAndGate(terminals[randomTerminal].length);

        console.log(randomTerminal, randomGate);
        randomGate = randomGate + 1;

        if(!airport.disabledgates.includes(randomTerminalChar + "" + randomGate)) {
            // console.log(gate + " if");

            randomGate = randomGate - 1;
            
            if(terminals[randomTerminal][randomGate].length === 0) {
                terminals[randomTerminal][randomGate].push(time);
                isTerminalGateAssigned = true;
            }
            else {
                // console.log(gate + " else");

                let isOccupied = false;
                
                terminals[randomTerminal][randomGate].forEach(occupiedTime => {
                    // console.log(gate, new Date(occupiedTime).getTime(), new Date(time).getTime());

                    if(new Date(occupiedTime).getTime() + 3600000 >= new Date(time).getTime()) {
                        isOccupied = true;
                        return;
                    }
                });

                if(!isOccupied) {
                    terminals[randomTerminal][randomGate].push(time);
                    isTerminalGateAssigned = true;
                }
            }

            count++;

            if(isTerminalGateAssigned) {
                randomGate = randomGate + 1;
                request.body[gate] = intToChar(randomTerminal) + randomGate;
            }
        }
    }
    
    if(isTerminalGateAssigned) updateTerminalGateInDB(airport);

    return request.body;
};

/**
 * 
 * @param {Object} result 
 * @param {Object} request 
 * @param {String} source 
 * @param {String} destination 
 * 
 * Assign random terminal and gate for flight schedule
 * @returns request with updated terminal and gate for arrival and destination
 */
const getRandomTerminalGateForCity = (result, request, source, destination) => {
    console.log("Assign random terminal and gate for flight schedule in getRandomTerminalGateForCity", result);
    
    let sourceAirport, destinationAirport;

    result.data.forEach(airport => {
        if(airport.city == source) {
            sourceAirport = airport;
        }

        if(airport.city == destination) {
           destinationAirport = airport;
        }
    });
    
    request.body = generateRandomTerminalGate(request, sourceAirport, false, "arrivalgate", request.body.start_time);
    request.body = generateRandomTerminalGate(request, destinationAirport, false, "destinationgate", request.body.end_time);

    return request;
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * Fetch terminals and gates from DB 
 */
exports.fetchTerminalsGates = (request, response) => {
    let source = request.body.source;
    let destination = request.body.destination;

    axios.get(`${process.env.BASE_URL}/terminalgates`, {
        params: {
            source: source,
            destination: destination
        } 
    })
    .then(result => {
        console.log("Fetch terminals and gates from DB in fetchTerminalsGates", request.body);
  
        request = getRandomTerminalGateForCity(result, request, source, destination);

        response.status(200).json({
            schedule: request.body
        });
    })
    .catch(error => {
        console.log("Error fetching terminals and gates from DB in fetchTerminalsGates", error);
        
        response.status(500).json(error);
    });
};