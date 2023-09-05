"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db = require('./database/connection');
const app = (0, express_1.default)();
const port = 3000;
const path = require('path');
const fs = require('fs-extra');
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
