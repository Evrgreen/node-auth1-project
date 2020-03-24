const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const usersRouter = require('../users/users-router.js');
const authRouter = require('../Auth/authRouter.js');
const server = express();
const restricted = require('../Auth/restrictedMiddleware.js');

const sessionConfig = {
  name:'Monster',
  secret: 'secret to everyone',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //true in production to send cookies only from a https connection
    httpOnly: true, //true means no access from JS
  },
  resave: false,
  saveUnitialized: true//GDPR laws require to check with client before saving cookies
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
