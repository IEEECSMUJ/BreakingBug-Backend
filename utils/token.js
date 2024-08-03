const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
const createNewToken = (payload) => {
    return jwt.sign({ userId: payload }, process.env.SECRET_KEY, { expiresIn: '10d' });
}

module.exports = {createNewToken};

