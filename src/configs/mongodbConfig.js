require('dotenv').config();
module.exports = {
    development: {
        database: process.env.DB_NAME,
        host: process.env.HOST_NAME,
        port: process.env.DB_PORT,
    }
}