const { Router } = require('express');
const router = new Router();

const carController = require('../controllers/carController'); 

const {
    pagination: { paginateData },
    validation: { validateCar, validatePatchCar }
} = require('../middlewares');

router
    .route('/')
        .get(paginateData, carController.getAllCars)
        .post(validateCar, carController.createCar)
        .put(validateCar, carController.updateCar);
router
    .route('/:id')
        .get(carController.getCarById)
        .patch(validatePatchCar, carController.patchCar)
        .delete(carController.deleteCar);

module.exports = router;