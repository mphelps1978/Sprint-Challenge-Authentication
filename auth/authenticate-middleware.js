const jwt = require("jsonwebtoken"); // <<< install this npm package

module.exports = (req, res, next) => {
  const jwtSecret = 'this is a secret'
  const { authorization } = req.headers;
  if (authorization) {
      jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid Credentials" });
        } else {
          req.decodedToken = decodedToken;

          next();
        }
      });
    } else {
      res.status(400).json({ message: "No credentials provided" });
    }

};
