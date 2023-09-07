"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv = require('dotenv');
dotenv.config();
const conString = 'postgres://zuadfxiv:M6XzYNbbcPoVKPcNlZKj6xPYePYknL9r@dpg-cjsp9im3m8ac73es0up0-a.oregon-postgres.render.com/zuadfxiv'// Replace with your actual database connection string
const client = new pg_1.Client({
    connectionString: conString,
});
client.connect()
    .then(() => {
    console.log('Connected to PostgreSQL');
    // Run your queries here
    client.query('SELECT NOW() AS "theTime"')
        .then((result) => {
        console.log(result.rows[0].theTime);
    })
        .catch((err) => {
        console.error('Error running query', err);
    });
})
    .catch((err) => {
    console.error('Could not connect to PostgreSQL', err);
});
module.exports = client;
