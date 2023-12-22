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
