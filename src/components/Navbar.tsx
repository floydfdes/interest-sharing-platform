import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../redux/userSlice"; // Import actions

import { AppDispatch } from "../redux/store"; // Import AppDispatch type

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // Access user and authentication state from Redux
    const { user, isAuthenticated } = useSelector((state: any) => state.user);
    console.log(user, isAuthenticated);

    useEffect(() => {
        // Fetch user profile if authenticated
        if (isAuthenticated) {
            dispatch(fetchUserProfile());
        }
    }, [isAuthenticated, dispatch]);

    const handleLogout = () => {
        // Dispatch logout action
        dispatch(logout());
        navigate("/login");
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "rgba(98, 0, 234, 0.9)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
                    Interest Sharing Platform
                </Typography>
                <Box display="flex" alignItems="center">
                    {isAuthenticated && user ? (
                        <>
                            <Link
                                to="/home"
                                style={{ textDecoration: "none", marginRight: "10px" }}
                            >
                                <Button
                                    color="inherit"
                                    sx={{
                                        color: "white",
                                        borderRadius: "20px",
                                        "&:hover": { backgroundColor: "rgba(3, 218, 197, 0.7)" },
                                    }}
                                >
                                    Home
                                </Button>
                            </Link>
                            <Link
                                to="/profile"
                                style={{ textDecoration: "none", marginRight: "10px" }}
                            >
                                <Button
                                    color="inherit"
                                    sx={{
                                        color: "white",
                                        borderRadius: "20px",
                                        "&:hover": { backgroundColor: "rgba(3, 218, 197, 0.7)" },
                                    }}
                                >
                                    Profile
                                </Button>
                            </Link>
                            <Button
                                color="inherit"
                                sx={{
                                    color: "white",
                                    borderRadius: "20px",
                                    "&:hover": { backgroundColor: "rgba(3, 218, 197, 0.7)" },
                                }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <Button
                                color="inherit"
                                sx={{
                                    color: "white",
                                    borderRadius: "20px",
                                    "&:hover": { backgroundColor: "rgba(3, 218, 197, 0.7)" },
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
