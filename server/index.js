import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'mytodo'
});

app.get('/', (req,res)=>{
    res.json('hello world');
})

app.get('/books',(req,res)=>{
    db.query('select * from books', (err, result)=>{
        if(err){
            console.log(err);
            return res.json(err);
        }
        res.json(result);

    })
})

app.post('/books',(req, res)=>{
    const values = [req.body.title, req.body.descr, req.body.cover];

    db.query('insert into books (`title`, `descr`, `cover`) values(?,?,?)', values, (err, result)=>{
        if(err){
            console.log(err);
            return res.json(err);
        }
        res.json('success');
    })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}
)