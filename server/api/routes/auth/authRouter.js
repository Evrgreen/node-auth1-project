const router = require('express').Router();
const bcrypt = require('bcrypt');

const Auth = require('./authModel.js');
const authRedirect = require('./authMiddleware');

router.get('/users', authRedirect, async (req, res) => {
  try {
    const users = await Auth.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    const userInfo = req.body;
    const ROUNDS = process.env.HASH_ROUNDS || 8;
    userInfo.password = bcrypt.hashSync(userInfo.password, ROUNDS);
    const newUser = await Auth.add(userInfo);
    newUser
      ? res
          .status(200)
          .json({ message: 'Account Created Successfully', user: newUser })
      : res
          .status(403)
          .json({ message: 'Not able to create account, try again later' });
  } catch (error) {
    res.status(400).json({
      errorMessage: `Encountered an error while processing that request:${error}`,
    });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await Auth.findby({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = {
        username: user.username,
        id: user.id,
      };
      res.status(200).json({ message: 'Login successful', user: user });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (error) {}
});
module.exports = router;
