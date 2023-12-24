const httpStatus = require("http-status/lib");
const Task = require("../models/task.model");

exports.list = async (req, res, next) => {
    try {
        const _tasks = await Task.get(req.params);
        const tasks = _tasks.map((task) => task.transform());

        return res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try {
        await new Task(req.body).save();
        res.status(httpStatus.CREATED);
        return res.json({
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const _res = await Task.updateOne({ _id: req.params.id }, req.body);
        if (_res.modifiedCount) {
            return res.json({
                success: true,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const _res = await Task.deleteOne({ _id: req.params.id });
        if (_res.deletedCount) {
            return res.json({
                success: true,
            });
        }
    } catch (error) {
        next(error);
    }
};
