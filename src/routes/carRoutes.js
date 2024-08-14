const { Router } = require('express');
const router = new Router();

const carController = require('../controllers/carController'); 

const {
    pagination: { paginateData },
    validation: { validateCar, validatePatchCar },
    upload: { uploadCarLogo }
} = require('../middlewares');

router
    .route('/')
        .get(paginateData, carController.getAllCars)
        .post(uploadCarLogo.single('logo'), validateCar, carController.createCar)
        .put(uploadCarLogo.single('logo'), validateCar, carController.updateCar);
router
    .route('/:id')
        .get(carController.getCarById)
        .patch(uploadCarLogo.single('logo'), validatePatchCar, carController.patchCar)
        .delete(carController.deleteCar);

module.exports = router;