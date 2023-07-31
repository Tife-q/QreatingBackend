const jwt = require("jsonwebtoken");
const config = require('config');
const JWT_SECRET = config.get('jwtPrivateKey')

const   authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(400).send("No token is provided");
  try {
    let result = jwt.verify(token, JWT_SECRET);
    req.id = result;
    req.role = result.role
    req.userId= result.id
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

module.exports = authenticateToken;
