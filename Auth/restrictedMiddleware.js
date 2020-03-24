module.exports = (req, res, next) => {
  console.log(req.session);
  console.log('session', req.session, req.session.user);
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ errorMessage: 'You must be logged in' });
    }
  } catch (error) {
    console.log(error);
  }
};
