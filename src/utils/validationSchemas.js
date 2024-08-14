const yup = require('yup');

const REQUIRED_STRING_SCHEMA = yup.string().required();

const PAGINATION_SCHEMA = yup.object().shape({
    limit: yup.number().min(1).max(100).required(),
    offset: yup.number().min(0).required()
});

const CAR_VALIDATION_SCHEMA = yup.object().shape({
    brand: REQUIRED_STRING_SCHEMA,
    model: REQUIRED_STRING_SCHEMA,
    year: yup.date().required(),
    color: REQUIRED_STRING_SCHEMA,
    engine_type: REQUIRED_STRING_SCHEMA,
    bodywork_type: REQUIRED_STRING_SCHEMA,
    gear_type: REQUIRED_STRING_SCHEMA,
    new: yup.boolean(),
    logo: yup.string().nullable(),
    type: REQUIRED_STRING_SCHEMA,
});

const CAR_PATCH_VALIDATION_SCHEMA = yup.object().shape({
    brand: yup.string(), 
    model: yup.string(),
    year: yup.date(), 
    color: yup.string(), 
    engine_type: yup.string(), 
    bodywork_type: yup.string(), 
    gear_type: yup.string(), 
    new: yup.boolean(),
    logo: yup.string().nullable(),
    type: yup.string(), 
});


const TYPE_VALIDATION_SCHEMA = yup.object().shape({
    name: REQUIRED_STRING_SCHEMA,
});


module.exports = {
    yup,
    PAGINATION_SCHEMA,
    CAR_VALIDATION_SCHEMA,
    TYPE_VALIDATION_SCHEMA,
    CAR_PATCH_VALIDATION_SCHEMA,
};