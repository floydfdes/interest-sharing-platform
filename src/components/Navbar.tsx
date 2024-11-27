import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadUser = () => {
            const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
            setUser(loggedInUser);
        };

        loadUser();

        window.addEventListener("storage", loadUser);

        return () => {
            window.removeEventListener("storage", loadUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Interest Sharing Platform
                </Typography>
                <Box display="flex" alignItems="center">
                    {user && user.username ? (
                        <>
                            <Link to="/home" style={{ textDecoration: "none", marginRight: "10px" }}>
                                <Button color="inherit" sx={{ color: "white" }}>Home</Button>
                            </Link>
                            <Link to="/profile" style={{ textDecoration: "none", marginRight: "10px" }}>
                                <Button color="inherit" sx={{ color: "white" }}>Profile</Button>
                            </Link>
                            <Button color="inherit" sx={{ color: "white" }} onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <Button color="inherit" sx={{ color: "white" }}>Login</Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
