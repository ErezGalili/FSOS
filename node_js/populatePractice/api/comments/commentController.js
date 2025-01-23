const Comment = require('./commentModel');

exports.create = async function (req, res, next) {
    try {
        const p1 = req.body;
        const newItem = await Comment.create(p1);
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

exports.getAll = async function (req, res, next) {
    try {
        const comments = await Comment.find();
        res.status(200).json({
            status: "success",
            data: comments
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "error: " + err
        });
    }
};