import { Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../redux/postSlice";
import { AppDispatch } from "../redux/store";

const ExplorePage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { posts, loading, error } = useSelector((state: any) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);


    const filteredPosts = posts.filter((post: any) =>
        post.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );


    const handlePostClick = (postId: string) => {
        navigate(`/post/${postId}`);
    };


    if (loading) return <Typography>Loading posts...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

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

                {filteredPosts.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredPosts.map((post: any) => (
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
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        style={{ width: "100%", borderRadius: "8px" }}
                                    />
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
                ) : (
                    <Typography variant="h6" color="textSecondary" style={{ marginTop: "30px", textAlign: "center" }}>
                        No posts found matching your interests. Try searching for something else!
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default ExplorePage;
