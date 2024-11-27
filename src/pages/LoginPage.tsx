import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { users } from "../data/data";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = users.find((user) => user.username === username);
        if (user && password === user.password) {
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/home");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                Login
            </Typography>
            {error && <Typography color="error" gutterBottom>{error}</Typography>}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
                style={{ marginBottom: "20px" }}
            >
                Login
            </Button>
            <Box display="flex" justifyContent="center">
                <Typography variant="body2">
                    Don't have an account? <a href="/signup">Sign up</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginPage;
