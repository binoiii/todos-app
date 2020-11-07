const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route         login
// @description   AUTHENTICATE USER LOGIN
// @access        PUBLIC

exports.validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: true,
        message: "Invalid username and/or password.",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    const { _id, name } = user;

    if (!isMatch)
      return res.status(400).json({
        success: true,
        message: "Invalid username and/or password.",
      });

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          _id,
          name,
          token,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error.",
    });
  }
};
