const express = require('express');
const app = express();
const port = 3000;
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'students_class',
    password: 'docker',
    port: 5432,
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/students', (req, res) =>{
    async function getStudents() {
        try { 
            const result = await pool.query('SELECT * FROM students');
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.error(e.stack);
        }
    }
    getStudents();
});

app.get('/students/:id', (req, res) =>{
    async function getStudents() {
        try { 
            const result = await pool.query(`SELECT * FROM students WHERE student_id = ${req.params.id}`);
            console.log(result);
            res.send(result.rows);
        } catch (e) {
            console.error(e.stack);
        }
    }
    getStudents();
});

// app.post('/students', (req, res)=>{
//     async function postStudents(){
//      try{
//          let students = req.body;
//          let name = students.name;
//          let age = students.age;
//          const result = await pool.query(`INSERT INTO students (name, age) VALUE `)
//      }   
//     }

// });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});