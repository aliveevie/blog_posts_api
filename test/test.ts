import chai from 'chai';
import chaiHttp from 'chai-http';
import { suite, test } from 'mocha'; // Import before from 'mocha'
import server from '../src/server';
import { assert } from 'chai';

chai.use(chaiHttp)

suite('The Functional Test', () => {
   test('Get the homepage URL', () => {
        chai
            .request(server)
            .keepOpen()
            .get('/')
            .end((err, res) => {
                assert.equal(res.status, 200, 'The response should be 200')
            });
   });

   test('Get the blog post!', () => {
    chai
        .request(server)
        .keepOpen()
        .get('/blogs')
        .end((err, res) => {
            assert.equal(res.status, 200, 'The response should be 200')
            assert.isArray(res.body, 'The response should be an array')
        })
   });

   test('User should register', () => {
    const postData = {
        username: 'ChaiTesting',
        email: 'Chai@tesing.com'
      }
    chai
        .request(server)
        .keepOpen()
        .post('/sign')
        .send(postData)
        .end((err, res) => {
            assert.equal(res.status, 302,  'The should redirect to a new page')
            assert.equal(res.header.location,  'add.html', 'it should redirect correctly please' )
        
        const addData = {
            author: 'ChaiTesting',
            title: 'ChaiPost',
            post: 'The chai posting of the year!'
        }
        chai
            .request(server)
            .keepOpen()
            .post('/add')
            .send(addData)
            .end((err, res) => {
                assert.equal(res.status, 200, 'The status should be 200')
                assert.deepEqual(res.body, { post: 'Post Successful!' }, 'Response body should contain the expected message');
            })
        
        });

   });

   suite('Testing the API by Page', () => {
    test('Get the API by Page', () => {
        chai
            .request(server)
            .keepOpen()
            .get('/posts')
            .end((err, res) => {
               assert.equal(res.status, 200, 'The status should be 200')
               assert.isArray(res.body, 'The response is array format')
            });
   });
   test('Get the API by Page', () => {
    chai
        .request(server)
        .keepOpen()
        .get('/posts?page=2')
        .end((err, res) => {
           assert.equal(res.status, 200, 'The status should be 200')
           assert.isArray(res.body, 'The response is array format')
        });


});

test('Get the API by Page', () => {
    chai
        .request(server)
        .keepOpen()
        .get('/posts?page=5')
        .end((err, res) => {
           assert.equal(res.status, 200, 'The status should be 200')
           assert.isArray(res.body, 'The response is array format')
        });


});

test('Get the API by Page', () => {
    chai
        .request(server)
        .keepOpen()
        .get('/posts?page=1&title=chaiTesting&author=chaiTesting')
        .end((err, res) => {
           assert.equal(res.status, 200, 'The status should be 200')
           assert.isArray(res.body, 'The response is array format')
        });


});


   })
})



