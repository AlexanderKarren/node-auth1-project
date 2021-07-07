const express = require('express');

const Users = require('../data/usersModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Users.find().then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error: error.message }))
})

module.exports = router;