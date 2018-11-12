require('babel-register');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const studentsRouter = require('./controller')

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/v1/students', studentsRouter)

app.listen(PORT, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`CORS-enabled web server listening on port ${PORT}`);
});
