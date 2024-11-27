import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { users } from "../data/data";

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        const existingUser = users.find((user) => user.username === username || user.email === email);

        if (existingUser) {
            setError("Username or email already exists");
            return;
        }

        const newUser = {
            id: (users.length + 1).toString(),
            username,
            email,
            password,
            profilePic: "https://picsum.photos/200/300",
        };

        users.push(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        navigate("/home");
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                Signup
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleSignup}
                fullWidth
                style={{ marginBottom: "20px" }}
            >
                Signup
            </Button>
            <Box display="flex" justifyContent="center">
                <Typography variant="body2">
                    Already have an account? <a href="/login">Login</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignupPage;
