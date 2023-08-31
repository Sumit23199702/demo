const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-user-key"];
    if (!token) token = req.headers["X-User-Key"];
    if (!token)
      return res.status(401).send({
        status: false,
        message: "Token is required!",
      });

    let decodedToken = jwt.verify(token, "secretkey");
    if (!decodedToken)
      return res
        .status(403)
        .send({ status: false, message: "Inter valid token" });

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { verifyToken };
