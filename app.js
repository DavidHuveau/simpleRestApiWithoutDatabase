require('babel-register');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const studentsRouter = express.Router();
 const studentsRouter = require('./controller/controller')

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/v1/students', studentsRouter)

app.listen(8080, () => console.log('Start on 8080'));
