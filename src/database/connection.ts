import dotenv from 'dotenv';
dotenv.config();
const { Pool } =  require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: process.env.PASSWORD,
    port: 5432 // The default postgres SQL
});

pool
    .connect()
    .then(() => console.log('Connection is Successful!'));

module.exports = pool;