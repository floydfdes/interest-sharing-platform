// src/pages/HomePage.tsx

import { Avatar, Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import React from "react";
import { featuredPosts } from "../data/data"; // Import data from data.ts
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleExploreInterests = () => {
        navigate("/explore"); // Navigate to the Explore Page
    };

    const handlePostClick = (postId: string) => {
        navigate(`/post/${postId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <Container maxWidth="md" style={{ paddingTop: "50px" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3" gutterBottom>
                    Welcome to the Interest Sharing Platform
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                    Hello, {user.username || "Guest"}! Welcome to a world of exploration, creativity, and shared interests.
                </Typography>

                {user.profilePic && (
                    <Avatar
                        alt={user.username}
                        src={user.profilePic}
                        style={{ width: 100, height: 100, marginTop: 20 }}
                    />
                )}

                <Box marginTop={4} width="100%" textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleExploreInterests}>
                        Explore Interests
                    </Button>
                </Box>

                <Typography variant="h5" style={{ marginTop: "40px", marginBottom: "20px" }}>
                    Featured Posts
                </Typography>

                <Grid container spacing={3}>
                    {featuredPosts.map((post) => (
                        <Grid item xs={12} sm={4} key={post.id}>
                            <Paper elevation={3} style={{ padding: "20px", cursor: "pointer" }} onClick={() => handlePostClick(post.id)}>
                                <img src={post.imageUrl} alt={post.title} style={{ width: "100%", borderRadius: "8px" }} />
                                <Typography variant="h6" style={{ marginTop: "10px" }}>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" style={{ marginTop: "5px" }}>
                                    {post.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Box marginTop={4}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                        style={{ marginTop: "20px" }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
