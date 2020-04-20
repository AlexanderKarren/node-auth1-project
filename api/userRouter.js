const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../data/usersModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Users.find().then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error: error.message }))
})

router.post('/register', (req, res) => {
    let user = req.body;

    const rounds = process.env.HASH_ROUNDS || 14;

    user.password = bcrypt.hashSync(user.password, rounds);

    Users.register(user).then(user => res.status(201).json(user));
})

module.exports = router;