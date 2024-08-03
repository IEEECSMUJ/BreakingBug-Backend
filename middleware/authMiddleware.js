const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
    }

    try {
        // #14  jwt.env == > jwt.verify
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;