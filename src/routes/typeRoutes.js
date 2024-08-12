const { Router } = require('express');
const router = new Router();

const typeController = require('../controllers/typeController');

const {
    pagination: { paginateData },
    validation: { validateType, validatePatchType }
} = require('../middlewares');

router
    .route('/')
        .get(paginateData, typeController.getAllTypes)
        .post(validateType, typeController.createType)
        .put(validateType, typeController.updateType);
router
    .route('/:id')
        .patch(validatePatchType, typeController.patchType)
        .delete(typeController.deleteType);

module.exports = router;