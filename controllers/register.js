const User = require("../models/User");
const UserTodo = require("../models/UserTodo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   /register
// @desc    REGISTER USER
// @access  PUBLIC

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: "false",
        message: "Email address already used.",
      });

    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        const { _id, name, email } = await newUser.save();
        const newUserTodo = new UserTodo({ _id });
        await newUserTodo.save();

        jwt.sign(
          { _id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.status(201).json({
              success: true,
              _id,
              name,
              token,
            });
          }
        );
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err,
    });
  }
};
