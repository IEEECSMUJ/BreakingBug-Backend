const jwt = require("jsonwebtoken");
// imported dotenv 
const dotenv = require('dotenv');
dotenv.config()

const createNewToken = (payload) => {
   // .env should be there instead of getuid
    return jwt.sign({ userId: payload }, process.env.SECRET_KEY, { expiresIn: '10d' });
};

// function should be export to use it outside
module.exports = {
    createNewToken,
};
