const express = require("express");
const router = express.Router();
const taskroute = require("./task.route");

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * Product Routes
 */
router.use("/task", taskroute);

module.exports = router;
