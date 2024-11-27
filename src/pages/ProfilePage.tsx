import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { users } from "../data/data";

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
        if (loggedInUser) {
            const currentUser = users.find((u) => u.id === loggedInUser.id);
            setUser(currentUser);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return <div>Loading...</div>;

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
