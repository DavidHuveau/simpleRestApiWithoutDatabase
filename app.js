require('babel-register');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const PORT = 3000;

const studentsRouter = require('./controller')

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/v1/students', studentsRouter)

app.listen(PORT, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`Server is listening on ${PORT}`);
});
