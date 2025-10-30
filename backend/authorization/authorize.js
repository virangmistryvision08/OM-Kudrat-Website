const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {

  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthor User!" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Expired token!" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = authToken;
