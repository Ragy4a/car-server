const {
    yup,
    CAR_VALIDATION_SCHEMA,
    TYPE_VALIDATION_SCHEMA,
    CAR_PATCH_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

const validateSchema = (schema) => async (req, res, next) => {
    const { body } = req;
    try {
      await schema.validate(body, { abortEarly: false });
      next();
    } catch (error) {
      console.log(error.errors);
      res.status(400).json({ errors: error.errors });
    }
};

module.exports.validateCar = validateSchema(CAR_VALIDATION_SCHEMA);
module.exports.validateType = validateSchema(TYPE_VALIDATION_SCHEMA);
module.exports.validatePatchCar = validateSchema(CAR_PATCH_VALIDATION_SCHEMA);