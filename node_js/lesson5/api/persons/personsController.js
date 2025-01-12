const Persons = require('./PersonModel')

exports.get = async (req, res) => {
    try {
        const items = await Persons.find();
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

exports.getOne = async (req, res) => {
    try {
        const person = await Persons.findById(req.params.id);
        if (!person) {
            return res.status(404).json({
                status: 'fail',
                message: 'Person not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: person
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
        const newItem = await Persons.create(p1);
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
        const person = await Persons.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!person) {
            return res.status(404).json({
                status: 'fail',
                message: 'Person not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: person
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
        const person = await Persons.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({
                status: 'fail',
                message: 'Person not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Person deleted'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
};
