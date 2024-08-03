const jwt = require('jsonwebtoken');

const dotenv = require("dotenv")
dotenv.config(); 

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded;
        next();
    } catch (err) {
        return res.status(401).json({success: false, message: 'Invalid token' });
    }
};

module.exports = authMiddleware;