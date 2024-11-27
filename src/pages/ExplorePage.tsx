// src/pages/ExplorePage.tsx

import { Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { posts } from "../data/data";
import { useNavigate } from "react-router-dom";

const ExplorePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const filteredPosts = posts.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Handle post click
    const handlePostClick = (postId: string) => {
        navigate(`/post/${postId}`);
    };

    return (
        <Container maxWidth="md" style={{ paddingTop: "50px" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3" gutterBottom>
                    Explore Interests
                </Typography>
                <Typography variant="h6" style={{ textAlign: "center", marginBottom: "20px" }}>
                    Discover posts about various interests and passions.
                </Typography>

                <TextField
                    label="Search Interests"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: "30px" }}
                />

                <Grid container spacing={3}>
                    {filteredPosts.map((post) => (
                        <Grid item xs={12} sm={4} key={post.id}>
                            <Paper
                                elevation={3}
                                style={{ padding: "20px", cursor: "pointer" }}
                                onClick={() => handlePostClick(post.id)}
                            >
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
            </Box>
        </Container>
    );
};

export default ExplorePage;
