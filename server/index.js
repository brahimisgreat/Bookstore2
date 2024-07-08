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

app.delete('/books/:id', (req,res)=> {
    const bookid = req.params.id;
    const q = 'delete from books where id = ?'
    
    db.query(q, bookid, (err, result)=>{
        if(err){
            console.log(err);
            return res.json(err);
        }
    })
})

app.put('/books/:id', (req,res)=> {
    const bookid = req.params.id;
    const q = `update books set 'title' = ?, 'descr' =?, 'cover' = ?, 'price' =? where id = ?`
    const values = [req.body.title, req.body.descr, req.body.cover, req.body.price,]
    
    db.query(q,[...values, bookid], (err, result)=>{
        if(err)
            console.log(err);
        return res.json("updated");
    })
})

app.post('/books',(req, res)=>{
    const values = [req.body.title, req.body.descr, req.body.cover, req.body.price];

    db.query('insert into books (`title`, `descr`, `cover`, `price`) values(?,?,?,?)', values, (err, result)=>{
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