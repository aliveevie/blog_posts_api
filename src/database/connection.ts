import dotenv from 'dotenv';
dotenv.config();
const { Pool } =  require('pg');


const pool = new Pool({
    connectionString: process.env.STRING
});

pool
    .connect()
    .then(() => console.log('Connection is Successful!'));

module.exports = pool;