const express = require('express');
const routes = require('./routes');

const { 
    errorHandlers: 
    { validationErrorHandler, mongooseErrorHandler, errorHandler } } = require('./middlewares');

const app = express();
app.use(express.json());

app.use('/api', routes);
app.use(validationErrorHandler, mongooseErrorHandler, errorHandler);

module.exports = app;