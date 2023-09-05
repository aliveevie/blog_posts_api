"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const db = require('./database/connection');
const app = (0, express_1.default)();
const port = 3000;
const path = require('path');
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/', (req, res) => {
    const { author, title, post } = req.body;
    const result = db.query('INSERT INTO blog_posts(title, content, author) VALUES($1, $2, $3)', [title, post, author]);
    console.log(result);
});
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
