const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token || typeof token !== 'string') {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required'
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired'
                });
            }

            req.user = decoded;
            next();
        } catch (jwtError) {
            if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token format'
                });
            }
            throw jwtError;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error during authentication'
        });
    }
};

module.exports = auth;
