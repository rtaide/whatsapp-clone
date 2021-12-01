const jwt = require ("jsonwebtoken");
const config = require ("config");

exports.authUser =  async function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied, No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("privateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};
