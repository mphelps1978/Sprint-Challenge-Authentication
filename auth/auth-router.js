const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./auth-model')

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).json({ message: "Unexpected error logging in" });
    });
});

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error.message);

      res.status(500).json({error: 'Unexpected error adding user'});
    });
});

function generateToken(user) {
  const jwtSecret = 'this is a secret'
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: 1000 * 60 *15,
  };

  return jwt.sign(payload, jwtSecret, options);
}

  module.exports = router;
