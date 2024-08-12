const { ValidationError } = require('yup');
const mongoose = require('mongoose');

module.exports.validationErrorHandler = (err, req, res, next) => {
    if(err instanceof ValidationError) {
        return res.status(400).send({
            errors: [{
                title: 'Validation error', 
                details: err.errors
            }],
        });
    }
    next(err)
};

module.exports.mongooseErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(err.errors).map(e => ({
            title: 'Validation Error',
            details: e.message,
            path: e.path
        }));

        return res.status(400).send({
            errors
        });
    }
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).send({
            errors: [{
                title: 'Duplication Error',
                details: `The value for field "${field}" must be unique.`,
                field
            }]
        });
    }
    if (err instanceof mongoose.Error) {
        return res.status(500).send({
            errors: [{
                title: 'Database Error',
                details: err.message
            }]
        });
    }
    next(err);
};

module.exports.errorHandler = (err, req, res, next) => {

    if(res.headerSent){
        return;
    }

    res.status(err?.status ?? 500).send({
        errors: [{
            title: err?.message ?? `Internal server error.`,
            errors: err.errors
        }]
    })
};