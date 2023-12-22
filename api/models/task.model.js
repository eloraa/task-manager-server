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
        const fields = ["id", "title", "description", "priority", "date"];

        fields.forEach((field) => {
            transformed[field] = this[field];
        });

        return transformed;
    },
});

taskSchema.statics = {
    async get(options) {
        let products;

        try {
            products = await this.find({
                uid: options.uid,
                email: options.email,
            });
        } catch (error) {
            throw error;
        }
        if (products) {
            return products;
        }

        throw new APIError({
            message: "There is no tasks.",
            status: httpStatus.NOT_FOUND,
        });
    },
};

module.exports = mongoose.model("Task", taskSchema);
