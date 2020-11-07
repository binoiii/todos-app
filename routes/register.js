const express = require("express");
const router = express.Router();
const { registerUser, getUsers } = require("../controllers/register");

router.route("/").post(registerUser);
module.exports = router;
