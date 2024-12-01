// src/pages/ExplorePage.tsx

import { Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { posts } from "../data/data";

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
        <Container maxWidth="lg" style={{ paddingTop: "60px" }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>
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
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: "20px",
                                    cursor: "pointer",
                                    borderRadius: "15px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                                    },
                                }}
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
