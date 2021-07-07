import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Input, Button, Loader, Dimmer } from 'semantic-ui-react'

const Register = () => {
    const [values, updateValues] = useState({
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { push } = useHistory();

    const handleChanges = event => {
        updateValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        setError("");
        await axios.post("http://localhost:4000/api/register", values)
        .then(response => {
            console.log(response);
            push("/");
        })
        .catch(error => {
            console.log(error.response.data.error);
            setError(error.response.data.error);
        });
        setLoading(false);
    }

    return (
        <div className="Login window">
            {loading && <div>
                <Dimmer active inverted>
                <Loader size='medium'>Loading</Loader>
                </Dimmer>
            </div>}
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
                <Input placeholder="Username" onChange={handleChanges} name="username"/>
                <Input placeholder="Password" onChange={handleChanges} name="password"/>
                <Input placeholder="Confirm Password" onChange={handleChanges} name="confirmPassword"/>
                <Button primary>Register</Button>
            </form>
            <div>{error}</div>
            <div>Already have an account? <Link to="/">Log In</Link></div>
        </div>
    )
}

export default Register
