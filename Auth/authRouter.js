const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');


router.route('/register').post(async (req, res) => {
  try {
    const userInfo = req.body;
    const ROUNDS = process.env.HASHING_ROUNDS || 14;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
    userInfo.password = hash;
    const user = await Users.add(userInfo);
    res.status(200).json(user);
  } catch (error) {
    res.send(error);
  }
});
router.route('/login').post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = {
        id: user.id,
        username: user.username,
      };
      console.log(req.session);
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: `There was a error with that request ${error}` });
  }
});
router.route('/logout').get(async (req, res) => {
  if (req.session) {
    req.session.destroy();
  } else {
    res.status(200).json({ message: 'You must be logged in to logout' });
  }
});
module.exports = router;
