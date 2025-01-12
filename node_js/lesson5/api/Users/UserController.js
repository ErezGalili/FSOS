const CurrentUser = require('./UserModel');

exports.createUser = async (req, res, next) => {
    try {
        const p1 = req.body;
        const newItem = await CurrentUser.create(p1);
        res.status(201).json({
            status: "success",
            data: newItem
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "error: " + err
        });
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await CurrentUser.findById(id);
        if (!data) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "error: " + err
        });
    }
};

exports.updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await CurrentUser.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!data) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: data
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "error: " + err
        });
    }
};

exports.getUsers = async (req, res, next) => {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    let query = CurrentUser.find(queryObj);

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }

    if (req.query.fields) {
        const selected = req.query.fields.split(',').join(' ');
        query = query.select(selected);
    }

    const limit = req.query.limit || 100;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    const documents = await CurrentUser.countDocuments(queryObj);

    if (skip >= documents) {
        return res.status(404).json({
            status: "fail",
            message: "No data on this page and limit"
        });
    }

    const data = await query.skip(skip).limit(limit);

    res.status(200).json({
        status: "success",
        data: data
    });
};

exports.deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await CurrentUser.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: "error: " + err
        });
    }
};
