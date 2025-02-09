const User = require('./UserSchema');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const userController = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'});}
                    if (!password || password.length < 5) {
                        return res.status(400).json({
                            success: false,
                            message: 'Password must be at least 5 characters long'
                        });
                    }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }

            const user = new User({
                email,
                password,
                name
            });

            await user.save();

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1000h' }
            );

            res.status(201).json({
                success: true,
                data: { token, user: { id: user._id, email: user.email, name: user.name } }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email, isAdmin: user.isAdmin },
                JWT_SECRET,
                { expiresIn: '1000h' }
            );

            res.status(200).json({
                success: true,
                data: { token, user: { id: user._id, email: user.email, name: user.name } }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.find({}, { password: 0 });
            return res.status(200).json({
                success: true, 
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false, 
                message: error.message 
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({success: false, message: 'User not found' });
            }
            res.status(200).json({success: true, data: user});
        } catch (error) {
            res.status(500).json({success: false, message: error.message });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false, 
                    message: 'User not found'
                });
            }

            // Toggle isAdmin status
            user.isAdmin = !user.isAdmin;
            await user.save();

            res.status(200).json({
                success: true, 
                data: {
                    id: user._id,
                    email: user.email, 
                    isAdmin: user.isAdmin, 
                    name: user.name
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message 
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({success: false, message: 'User not found' });
            res.status(200).json({success: true, message: 'User deleted' });
        } catch (error) {
            res.status(500).json({success: false, message: error.message });
        }
    }
};

module.exports = userController;