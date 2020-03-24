const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth/authRouter.js');

const server = express();
const sessionConfig = {
  name: '11x10EC',
  secret: 'secret to everyone',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, //true in production to send cookies only from a https connection
    httpOnly: true, //true means no access from JS
  },
  resave: false,
  saveUnitialized: true, //GDPR laws require to check with client before saving cookies
};
server.use(express.json());
server.use(session(sessionConfig));
server.use('/api', authRouter);

server.get('/', (req, res) => {
  res.send('Welcome to the server');
});

module.exports = server;
