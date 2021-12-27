
const jwt = require("jsonwebtoken")

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    return res.status(403).json({message:"A token is required for authentication"});
  }
  try {
    req.user = jwt.verify(token, config.TOKEN_KEY);

    console.log("user",req.user);
    
  } catch (err) {
    return res.status(401).send({message:"Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;


