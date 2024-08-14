const { Router } = require('express');
const router = new Router();

const typeController = require('../controllers/typeController');

const {
    validation: { validateType }
} = require('../middlewares');

router
    .route('/')
        .get(typeController.getAllTypes)
        .post(validateType, typeController.createType)
        .put(validateType, typeController.updateType);
router
    .route('/:id')
        .get(typeController.getTypeById)
        .delete(typeController.deleteType);

module.exports = router;