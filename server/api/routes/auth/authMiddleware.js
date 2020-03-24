module.exports = (req, res, next) => {
  console.log(req.session);
  if (req.session && req.session.user) {
    console.log('yep');
    next();
  } else {
    res.status(403).json({ message: 'Forbidden, you must be logged in' });
  }
};
