const express = require("express");
const router = express.Router();
const { validateUser } = require("../controllers/login");

router.route("/").post(validateUser);

module.exports = router;
