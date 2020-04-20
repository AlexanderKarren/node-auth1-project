import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
    const [users, updateUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4000/api/users")
        .then(response => updateUsers(response))
        .catch(error => setError(error.response.data.error));
    })

    return (
        <div className="Users">
            <h2>Users</h2>
            <Link to="/">Return to login page</Link>
            <div>{error}</div>
            {users.map(user => <div key={user.id}>{user.username}</div>)}
        </div>
    )
}

export default Users
