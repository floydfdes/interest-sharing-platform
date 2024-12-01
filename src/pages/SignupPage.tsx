import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { registerUser } from "../redux/userSlice";

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const { loading, error: reduxError } = useSelector((state: any) => state.user);

    const handleSignup = async () => {

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        try {

            await dispatch(registerUser({ username, email, password }));

            navigate("/home");
        } catch (err) {
            console.error("Signup failed:", reduxError);
            setError(reduxError || "An error occurred during signup");
        }
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
                disabled={loading}
                style={{ marginBottom: "20px" }}
            >
                {loading ? "Signing up..." : "Signup"}
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
