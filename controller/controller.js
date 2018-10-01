require('babel-register');

const express = require('express');
const app = express();
const studentsRouter = express.Router();
// const func=require('./functions');
const {success, error} = require('./functions');

// app.use('/api/v1/students', studentsRouter)

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

// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/students/1
// exemple:
// key = name
// value = Alexendra
studentsRouter.route('/:id')

    // get a student from an id
    .get((req, res) => {
        const index = getIndex(req.params.id);

        if (typeof (index) == 'string')
            res.json(error(index));
        else
            res.json(success(students[index]));
    })

    // update a student from an id
    .put((req, res) => {
        const index = getIndex(req.params.id);

        if (typeof (index) == 'string') {
            res.json(error(index));
        } else {
            students[index].name = req.body.name;
            res.json(success(students[index]));
        }
    })
    
    // delete a student from an id
    .delete((req, res) => {
        const index = getIndex(req.params.id);

        if (typeof (index) == 'string') {
            res.json(error(index));
        } else {
            students.splice(index,1);
            res.json(success(students));
        }
    });


// use Postman with parameter: x-www-form-urlencoded
// http://localhost:8080/api/V1/students
// exemple:
// key = name
// value = David
studentsRouter.route('/')

    // Get a student list by limiting the number of results
    // http://localhost:8080/api/V1/students?max=2
    .get((req, res) => {
        if (req.query.max != undefined && req.query.max > 0)
            res.json(success(students.slice(0, req.query.max)));
        else if(req.query.max != undefined)
            res.json(error('Wrong max value'));
        else
            res.json(success(students));
    })

    // Insert a student
    .post((req, res) => {
        // res.send(req.body);
        if (req.body.name) {
            let isAlreadyExist = false;
            
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

module.exports = studentsRouter;
