const express = require("express");
const router = express.Router();
const { authJWT } = require("../middleware/auth");
const User = require("../models/User");

router.route("/").get(authJWT, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = router;
