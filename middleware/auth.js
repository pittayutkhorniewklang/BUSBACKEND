const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret
        req.user = { id: decoded.id, username: decoded.username };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateUser;
