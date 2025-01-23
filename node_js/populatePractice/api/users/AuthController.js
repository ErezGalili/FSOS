const User = require('./UserModel');
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.signup = async function(req, res, next) {
    try {
        const newUser = new User({
            ...req.body,
            created: new Date(),
            modified: new Date()
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpireTime });

        res.status(201).json({
            status: 'success',
            token,
            data: user.toJson()
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists'
            });
        }
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.login = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.authenticate(password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: config.jwtExpireTime
        });

        res.status(200).json({
            status: 'success',
            token,
            data: user. toJson()
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.protectSystem = async (req, res, next) => {
    try {
        // 1) Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.'
            });
        }

        // 2) Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // 3) Add user to request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid token or user no longer exists'
        });
    }
};
