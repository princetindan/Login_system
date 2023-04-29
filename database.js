const mysql = require('mysql');
const express = require('express');
const {v4: uuidv4} = require('uuid')
const app = express();

app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog"
    
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to sql database!');
});

//get all users
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/register', (req, res) => {
    const { username, userpassword } = req.body;
    const id = uuidv4();// to generate new uuid
    const sql = (`INSERT INTO users VALUES("${id}", "${username}",'${userpassword}')`);
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`User with ID ${id} added to the database.`);
    });
});

//Update a user's data
app.put('/register/:id', (req, res) => {
    const { username, userpassword } = req.body;
    const sql = `UPDATE users SET name= "${username}", password='${userpassword}' WHERE id='${req.params.id}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(`User with ID ${req.params.id} updated`);
    });
});

//delete a user
app.delete('/', (req, res) => {
    const sql = `DELETE FROM users WHERE id='${req.params.id}'.`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(`User with ID ${req.params.id} deleted.`);
    });
});

app.listen(3000, () => {
    console.log('Connected to server successfully...')
})