"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha"); // Import before from 'mocha'
const server_1 = __importDefault(require("../src/server"));
const chai_2 = require("chai");
chai_1.default.use(chai_http_1.default);
(0, mocha_1.suite)('The Functional Test', () => {
    (0, mocha_1.test)('Get the homepage URL', () => {
        chai_1.default
            .request(server_1.default)
            .keepOpen()
            .get('/')
            .end((err, res) => {
            chai_2.assert.equal(res.status, 200, 'The response should be 200');
        });
    });
    (0, mocha_1.test)('Get the blog post!', () => {
        chai_1.default
            .request(server_1.default)
            .keepOpen()
            .get('/blogs')
            .end((err, res) => {
            chai_2.assert.equal(res.status, 200, 'The response should be 200');
            chai_2.assert.isArray(res.body, 'The response should be an array');
        });
    });
    (0, mocha_1.test)('User should register', () => {
        const postData = {
            username: 'ChaiTesting',
            email: 'Chai@tesing.com'
        };
        chai_1.default
            .request(server_1.default)
            .keepOpen()
            .post('/sign')
            .send(postData)
            .end((err, res) => {
            chai_2.assert.equal(res.status, 302, 'The should redirect to a new page');
            chai_2.assert.equal(res.header.location, 'add.html', 'it should redirect correctly please');
            const addData = {
                author: 'ChaiTesting',
                title: 'ChaiPost',
                post: 'The chai posting of the year!'
            };
            chai_1.default
                .request(server_1.default)
                .keepOpen()
                .post('/add')
                .send(addData)
                .end((err, res) => {
                chai_2.assert.equal(res.status, 200, 'The status should be 200');
                chai_2.assert.deepEqual(res.body, { post: 'Post Successful!' }, 'Response body should contain the expected message');
            });
        });
    });
    (0, mocha_1.suite)('Testing the API by Page', () => {
        (0, mocha_1.test)('Get the API by Page', () => {
            chai_1.default
                .request(server_1.default)
                .keepOpen()
                .get('/posts')
                .end((err, res) => {
                chai_2.assert.equal(res.status, 200, 'The status should be 200');
                chai_2.assert.isArray(res.body, 'The response is array format');
            });
        });
        (0, mocha_1.test)('Get the API by Page', () => {
            chai_1.default
                .request(server_1.default)
                .keepOpen()
                .get('/posts?page=2')
                .end((err, res) => {
                chai_2.assert.equal(res.status, 200, 'The status should be 200');
                chai_2.assert.isArray(res.body, 'The response is array format');
            });
        });
        (0, mocha_1.test)('Get the API by Page', () => {
            chai_1.default
                .request(server_1.default)
                .keepOpen()
                .get('/posts?page=5')
                .end((err, res) => {
                chai_2.assert.equal(res.status, 200, 'The status should be 200');
                chai_2.assert.isArray(res.body, 'The response is array format');
            });
        });
        (0, mocha_1.test)('Get the API by Page', () => {
            chai_1.default
                .request(server_1.default)
                .keepOpen()
                .get('/posts?page=1&title=chaiTesting&author=chaiTesting')
                .end((err, res) => {
                chai_2.assert.equal(res.status, 200, 'The status should be 200');
                chai_2.assert.isArray(res.body, 'The response is array format');
            });
        });
    });
});
