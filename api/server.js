const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const authenticator = require('./authenticator.js')

const userRouter = require('./userRouter.js')
const credentialsRouter = require('./credentialsRouter.js')

const server = express();

const sessionConfig = {
    name: "monster",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 60, // good for one minute
      secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
      httpOnly: false, // true means JS on the client cannot access the cooke
    },
  };

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api', credentialsRouter);
server.use('/api/users', authenticator, userRouter);


server.get('/', (req, res) => {
    res.send(`<h1>It's up</h1>`)
})

module.exports = server;