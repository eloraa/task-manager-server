const express = require("express");
const controller = require("../../controllers/task.controller");
const { validate } = require("express-validation/lib");
const { task } = require("../../validations/task.validation");
const router = express.Router();

router
    .route("/add")

    .post(validate(task), controller.add);

router
    .route("/get/:uid")

    .get(controller.list);

router
    .route("/update/:id")

    .patch(controller.update);

router
    .route("/delete/:id")

    .delete(controller.delete);

module.exports = router;
