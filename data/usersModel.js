const db = require('../api/db-config.js');

module.exports = {
    find,
    register
}

function find(id) {
    if (id) return db('users').where('id', id);
    else return db('users');
}

function register(user) {
    return db('users').insert(user, 'id')
    .then(([id]) => {
        return find(id);
    });
}