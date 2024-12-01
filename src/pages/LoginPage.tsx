// src/pages/LoginPage.tsx
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { loginUser } from "../redux/userSlice";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state: any) => state.user);

    const handleLogin = async () => {
        try {
            const response: any = await dispatch(loginUser({ email: username, password: password }));
            if (response.payload.user) {
                navigate("/home");
            }
        } catch (err) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: "50px" }}>
            <Typography variant="h3" gutterBottom>
                Login
            </Typography>
            {error && <Typography color="error" gutterBottom>{error}</Typography>}
            <TextField
                label="Username (Email)"
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
                disabled={loading} // Disable the button when loading
                style={{ marginBottom: "20px" }}
            >
                {loading ? "Logging in..." : "Login"}
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
