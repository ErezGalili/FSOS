const Product = require('./ProductModel');

exports.get = async (req, res) => {
    try {
        const items = await Product.find();
        res.status(200).json({
            status: 'success',
            data: items
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
};

exports.post = async (req, res) => {
    try {
        const p1 = req.body;
        const newItem = await Product.create(p1);
        res.status(201).json({
            status: 'success',
            data: newItem
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
};

exports.patch = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Product deleted'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
};

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
};