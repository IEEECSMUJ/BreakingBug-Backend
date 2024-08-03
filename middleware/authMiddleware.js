const jwt = require('jsonwebtoken');
// imported dotenv
const dotenv = require('dotenv');
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'Authorization token not found', data: null }); //  maintained api consistency
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // **Corrected: jwt.verify is the proper method**
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: 'fail', message: 'Invalid token', data: null }); // maintaing api resposnse consistency 
    }
};

module.exports = authMiddleware;
