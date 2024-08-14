const { createServer } = require('http');
const app = require('./src/app');

const HOST_NAME = process.env.HOST_NAME;
const PORT = process.env.SERVER_PORT

const server = createServer(app);

// const { types, cars } = require('./src/constants');
// const { Type, Car } = require('./src/models');

// const createData = async (model, data) => {
//     try {
//         const result = await model.create(data);
//         console.log(`${result.length} records added successfully!`);
//         return result;
//     } catch (error) {
//         console.error('Error adding data:', error);
//         throw error;
//     }
// };

// createData(Type, types);
// createData(Car, cars);

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running on 'http://${HOST_NAME}:${PORT}'.`)
})