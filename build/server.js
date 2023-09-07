"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const db = require('./database/connection');
const app = (0, express_1.default)();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const router = (0, express_1.Router)();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, title, post } = req.body;
    const id = yield db.query('SELECT user_id FROM users WHERE username = $1', [author]);
    console.log(id);
    if (!id) {
        res.json({ user: "Not Found!" });
        return;
    }
    const user_id = id.rows[0].user_id;
    const result = yield db.query('INSERT INTO blog_posts(title, content, author, user_id) VALUES($1, $2, $3, $4)', [title, post, author, user_id])
        .then(() => res.json({ post: "Post Successfully!" }));
}));
router.get('/posts/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const title = req.query.title;
    const author = req.query.author;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    try {
        if (title || author) {
            const data = yield db.query('SELECT * FROM blog_posts WHERE title=$1 OR author=$2 LIMIT $3 OFFSET $4', [title, author, itemsPerPage, offset]);
            res.json(data.rows);
            return;
        }
        else {
            const data = yield db.query('SELECT * FROM blog_posts LIMIT $1 OFFSET $2', [itemsPerPage, offset]);
            res.json(data.rows);
            return;
        }
    }
    catch (_a) {
        res.json({ error: 'Error Invalid Details!' });
    }
}));
router.get('/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db.query('SELECT * FROM blog_posts');
    res.json(data.rows);
    return;
}));
router.get('/specific/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Define the SQL statements
    const { title } = req.params;
    const { author } = req.query;
    const result = yield db.query(`SELECT title, content, author 
    FROM blog_posts 
    JOIN users ON 
    blog_posts.user_id = users.user_id 
    WHERE title='${title}' OR author='${author}';`);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Rows do not exist' });
    }
    else {
        res.json(result.rows);
        return;
    }
}));
router.post('/sign', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.body;
    const result = yield db.query('INSERT INTO users(username, email) VALUES($1, $2)', [username, email])
        .then(() => res.redirect('/add.html'));
}));
router.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const result = yield db.query('DELETE FROM blog_posts WHERE title=$1', [title]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Title do not exist' });
    }
    else {
        res.json({ delete: 'Delete Success!' });
        return;
    }
}));
router.post('/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, post } = req.body;
        const result = yield db.query('SELECT post_id FROM blog_posts WHERE title=$1', [title]);
        const post_id = result.rows[0].post_id;
        const update = yield db.query('UPDATE blog_posts SET content=$2 WHERE post_id=$1', [post_id, post])
            .then((res.json({ data: "Update is Successful!" })));
    }
    catch (_b) {
        res.send(404).json({ data: "Error Updating details please!" });
    }
}));
app.use('/', router);
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
