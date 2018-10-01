require('babel-register');

const success = (result) => {
    return {
        status: 'success',
        result: result
    };
}

const error = (message) => {
    return {
        status: 'error',
        message: message
    };
}

exports.success = success;
exports.error = error;
