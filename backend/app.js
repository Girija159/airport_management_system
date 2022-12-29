const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const signUpRoutes = require('./api/routes/signUp');
const loginRoutes = require('./api/routes/login');
const scheduleRoutes = require('./api/routes/schedules');
const arrivalsDeparturesRoutes = require('./api/routes/arrivalsDepartures');
const terminalsGates = require('./api/routes/terminalGates');
const assignBaggageCarousel = require('./api/routes/assignBaggageCarousel');
const enableDisableGates = require('./api/routes/enableDisableGates');

const app = express();

mongoose.connect(`mongodb+srv://sunny:sunny@airportdb.wcymbqa.mongodb.net/?retryWrites=true&w=majority`);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');

    if(request.method === 'OPTIONS') {
        request.header('Access-Control-Allow-Methods', '*');
        return response.status(200).json({});
    }

    next();
});

app.use('/signup', signUpRoutes);
app.use('/login', loginRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/arrivalsdepartures', arrivalsDeparturesRoutes);
app.use('/terminalgates', terminalsGates);
app.use('/assignbaggagecarousel', assignBaggageCarousel);
app.use('/enabledisablegates', enableDisableGates);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;