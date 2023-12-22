const httpStatus = require("http-status/lib");
const Task = require("../models/task.model");

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
