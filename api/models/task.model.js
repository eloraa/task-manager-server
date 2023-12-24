const mongoose = require("mongoose");
const APIError = require("../errors/api-error");
const httpStatus = require("http-status");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            min: 3,
            max: 200,
            required: true,
        },
        description: {
            type: String,
            min: 3,
            max: 500,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
            default: 1,
        },
        status: {
            type: String,
            default: "to-do",
        },
        email: {
            type: String,
            match: /^\S+@\S+\.\S+$/,
            required: true,
            trim: true,
            lowercase: true,
        },
        uid: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

taskSchema.method({
    transform() {
        const transformed = {};
        const fields = [
            "id",
            "title",
            "description",
            "priority",
            "status",
            "index",
            "date",
        ];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

taskSchema.statics = {
    async get(options) {
        let tasks;

        try {
            tasks = await this.find({
                uid: options.uid,
            }).sort({ index: 1, updatedAt: -1 });
        } catch (error) {
            throw error;
        }
        if (tasks) {
            return tasks;
        }

        throw new APIError({
            message: "There is no tasks.",
            status: httpStatus.NOT_FOUND,
        });
    },
};

module.exports = mongoose.model("Task", taskSchema);
