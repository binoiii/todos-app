const jwt = require("jsonwebtoken");

exports.authJWT = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access." });

  try {
    console.log(token, "token");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Unauthorized access.",
    });
  }
};
