const path = require('path');

const staticPath = path.resolve(process.env.STATIC_PATH);

module.exports = {
    cars: path.resolve(staticPath, 'logos', 'cars')
    // я создал объект с путями для следующих сущностей(если они будут)
};