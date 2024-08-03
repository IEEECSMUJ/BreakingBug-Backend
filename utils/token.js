const jwt = require("jsonwebtoken");

const createNewToken = (payload) => {
    // #9 process.getuid.SECRET_KEY ==> process.env.SECRET_KEY
    return jwt.sign({ userId: payload }, process.env.SECRET_KEY, { expiresIn: '10d' });
}

// #10 there was to no exporting
module.exports =  {createNewToken};