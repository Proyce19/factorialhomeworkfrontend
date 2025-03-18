import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", credentials);
            localStorage.setItem("token", response.data.access_token);
            navigate("/");
        } catch (error) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="auth-container">
            <h1>Admin Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
