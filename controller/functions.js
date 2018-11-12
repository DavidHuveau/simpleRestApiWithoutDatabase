require('babel-register');

const STATUS_SUCCESS = 'success';
const STATUS_ERROR = 'error';

const success = (result) => {
    return {
        status: STATUS_SUCCESS,
        result: result
    };
}

const error = (message) => {
    return {
        status: STATUS_ERROR,
        message: message
    };
}

exports.success = success;
exports.error = error;
