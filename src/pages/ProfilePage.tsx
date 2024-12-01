import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { fetchUserProfile } from "../redux/userSlice";

const ProfilePage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user, loading, error: reduxError } = useSelector((state: any) => state.user);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("profile") || "null");
        if (loggedInUser) {
            dispatch(fetchUserProfile());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (reduxError) {
            setError(reduxError);
        }
    }, [reduxError]);

    const handleLogout = () => {
        localStorage.removeItem("profile");
        navigate("/login");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container maxWidth="md" style={{ paddingTop: "50px" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                    alt={user.username}
                    src={user.profilePic}
                    sx={{ width: 150, height: 150, marginBottom: "20px" }}
                />
                <Typography variant="h4">{user.username}</Typography>
                <Typography variant="body1" color="textSecondary" style={{ marginTop: "10px" }}>
                    {user.email}
                </Typography>
                <Box marginTop="30px">
                    <Button variant="contained" color="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProfilePage;
