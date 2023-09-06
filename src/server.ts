import { urlencoded } from 'body-parser';
import express, { Request, Response} from 'express'
const db = require('./database/connection')
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', ( req: Request, res: Response ) => {
   
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/add',  async (req: Request, res: Response) => {
   const { author, title, post } = req.body;
    const id = await db.query('SELECT user_id FROM users WHERE username = $1', [author])
    console.log(id)
    if(!id){
        res.json({user:"Not Found!"})
        return
    }
    const user_id = id.rows[0].user_id
  
  
    const result = await db.query('INSERT INTO blog_posts(title, content, author, user_id) VALUES($1, $2, $3, $4)', 
   
    [title, post, author, user_id])
    .then(() => res.json({post:"Post Successfully!"}));
});

app.get('/posts/', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const title = req.query.title
    const author = req.query.author
    const itemsPerPage = 20;
    const offset:number = (page - 1) * itemsPerPage
    try {
          
        if(!page){
            const data = await db.query('SELECT * FROM blog_posts')
            res.json(data.rows);
            return;
        }
        if(page){
            const data = await db.query('SELECT * FROM blog_posts LIMIT $1 OFFSET $2',
            [itemsPerPage, offset])
            res.json(data.rows);
            return;
        }
        if(title){
            const data = await db.query('SELECT * FROM blog_posts WHERE title=$1 LIMIT $2 OFFSET $3',
            [title, itemsPerPage, offset])
            res.json(data.rows);
            return;
        }
        if(author){
            const data = await db.query('SELECT * FROM blog_posts WHERE author=$1 LIMIT $2 OFFSET $3',
            [author, itemsPerPage, offset])
            res.json(data.rows);
            return;
        }
        if(title && author){
            const data = await db.query('SELECT * FROM blog_posts WHERE  title=$1 AND author=$2 LIMIT $3 OFFSET $4',
            [title, author, itemsPerPage, offset])
            res.json(data.rows);
            return;
        }
    }
    catch{
        res.json({error:'Error Invalid Details!'})
    }
   
  
});


app.get('/specific/:title', async ( req:Request, res:Response ) => {
   // Define the SQL statements
    const { title } = req.params
    const { author } = req.query
    
    const result = await db.query(`SELECT title, content, author 
    FROM blog_posts 
    JOIN users ON 
    blog_posts.user_id = users.user_id 
    WHERE title='${title}' OR author='${author}';`);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Rows do not exist' });
      }else{
        res.json(result.rows)
        return
      }
});

app.post('/sign', async (req:Request, res:Response) => {
    const { username, email } = req.body
    const result = await db.query('INSERT INTO users(username, email) VALUES($1, $2)', 
    [username, email])
    .then(() =>  res.redirect('/add.html'))
});

app.post('/delete', async (req:Request, res:Response) => {
    const { title } = req.body
    const result = await db.query('DELETE FROM blog_posts WHERE title=$1', 
    [title]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Title do not exist' });
      }else{
        res.json({delete:'Delete Success!'})
        return
      }
});


app.listen(port, () => {
    console.log(`server started on port ${port}`);
});