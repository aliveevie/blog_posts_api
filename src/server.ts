import { urlencoded } from 'body-parser';
import express, { Request, Response} from 'express'
const db = require('./database/connection')
const app = express();
const port = 3000;
const path = require('path');
app.use(urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', ( req: Request, res: Response ) => {
   
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/',  async (req: Request, res: Response) => {
   const { author, title, post } = req.body;
    
   //const result = db.query('INSERT INTO blog_posts(title, content, author) VALUES($1, $2, $3)', 
   
   //[title, post, author]);
   const result = await db.query('INSERT INTO blog_posts(title, content, author) VALUES($1, $2, $3)', 
   
   [title, post, author])
   .then(() => res.send("Post Successfully!"));
});

app.get('/posts', async (req: Request, res: Response) => {
    const data = await db.query('SELECT * FROM blog_posts')
    res.json(data.rows);
})



app.listen(port, () => {
    console.log(`server started on port ${port}`);
});