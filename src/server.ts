import express, { Request, Response} from 'express'
const db = require('./database/connection')
const app = express();
const port = 3000;
const path = require('path');
const bodyparser = require('body-parser');
app.use(bodyparser);


app.use(express.static('public'));

app.get('/', ( req: Request, res: Response ) => {
   
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
});


app.listen(port, () => {
    console.log(`server started on port ${port}`);
});