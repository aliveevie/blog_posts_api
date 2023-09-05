"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = require('pg');
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
