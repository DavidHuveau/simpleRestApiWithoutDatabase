require('babel-register');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const func=require('./functions');
const {success, error} = require('./functions');

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

// http://localhost:8080/api/V1/students?max=2
app.get('/api/v1/students', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0)
        res.json(success(students.slice(0, req.query.max)));
    else if(req.query.max != undefined)
        res.json(error('Wrong max value'));
    else
        res.json(success(students));
});

// http://localhost:8080/api/V1/students/1
app.get('/api/v1/students/:id', (req, res) => {
    const index = getIndex(req.params.id);

    if (typeof (index) == 'string')
        res.json(error(index));
    else
        res.json(success(students[index]));
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

        // for (let i = 0; i < students.length; i++) {
        //     if (students[i].name == req.body.name) {
        //         isAlreadyExist = true;
        //         break;
        //     }
        // }
        
        // Name already Exist?
        if(students.find(element => element.name == req.body.name))
            isAlreadyExist = true;

        if (!isAlreadyExist) {
            // Add a new object in the array
            const student = {
                id: createID(),
                name: req.body.name
            };
            students.push(student);
            res.json(success(student));
        } else
            res.json(error('Name already Exist'));
    } else
        res.json(error('Key not found'));
});

// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/students/1
// exemple:
// key = name
// value = Alexendra
app.put('/api/v1/students/:id', (req, res) => {
    const index = getIndex(req.params.id);

    if (typeof (index) == 'string') {
        res.json(error(index));
    } else {
        students[index].name = req.body.name;
        res.json(success(students[index]));
    }
});

app.delete('/api/v1/students/:id', (req, res) => {
    const index = getIndex(req.params.id);

    if (typeof (index) == 'string') {
        res.json(error(index));
    } else {
        students.splice(index,1);
        res.json(success(students));
    }
});

app.listen(8080, () => console.log('Start on 8080'));

const getIndex = (id) => {
    for (let index = 0; index < students.length; index++) {
        if (students[index].id == id)
            return index;
    }
    return "Wrong id";
};

const createID = ()=>{
    return students[students.length - 1].id + 1;
};