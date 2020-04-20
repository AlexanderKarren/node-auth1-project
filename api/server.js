const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./userRouter.js')

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`<h1>It's up</h1>`)
})

module.exports = server;