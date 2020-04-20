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

    Users.register(user).then(user => res.status(201).json(user))
    .catch(error => res.status(500).json({ error: error.message }));
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.find({ username }).then(([user]) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) res.status(200).json({ message: `Welcome, ${username}`});
            else res.status(401).json({ error: "Incorrect password" });
        }
        else res.status(401).json({ error: `Username ${username} not found`})
    })
    .catch(error => res.status(500).json({ error: error.message }));
})

module.exports = router;