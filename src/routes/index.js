const { Router } = require('express');
const router = new Router();

const carRoutes = require('./carRoutes');
const typeRoutes = require('./typeRoutes');

router.use('/cars', carRoutes);
router.use('/types', typeRoutes);

module.exports = router;