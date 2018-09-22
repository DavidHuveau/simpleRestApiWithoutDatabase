require('babel-register');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const func=require('./functions');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const students = [{
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Patrick'
    },
    {
        id: 4,
        name: 'Anna'
    }
];

// http://localhost:8080/api/V1/students/1
app.get('/api/v1/students/:id', (req, res) => {
    const id = req.params.id;
    res.json(func.success(students[id - 1]));
});

// http://localhost:8080/api/V1/students?max=2
app.get('/api/v1/students', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0)
        res.json(func.success(students.slice(0, req.query.max)));
    else if(req.query.max != undefined)
        res.json(func.error('Wrong max value'));
    else
        res.json(func.success(students));
});

// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/students
// exemple:
// key = name
// value = David
app.post('/api/v1/students', (req, res) => {
    // res.send(req.body);
    if (req.body.name) {
        let isAlreadyExist = false;
        // Name already Exist?
        for (let i = 0; i < students.length; i++) {
            if (students[i].name == req.body.name) {
                isAlreadyExist = true;
                break;
            }
        }
        if (!isAlreadyExist) {
            const student = {
                id: students.length + 1,
                name: req.body.name
            };
            students.push(student);
            res.json(func.success(student));
        } else
            res.json(func.error('Name already Exist'))
    } else
        res.json(func.error('Key not found'));
});

app.listen(8080, () => console.log('Start on 8080'));
