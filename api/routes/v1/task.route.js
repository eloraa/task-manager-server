const express = require("express");
const controller = require("../../controllers/task.controller");
const { validate } = require("express-validation/lib");
const { task } = require("../../validations/task.validation");
const router = express.Router();

router
    .route("/add")

    .post(validate(task), controller.add);

module.exports = router;