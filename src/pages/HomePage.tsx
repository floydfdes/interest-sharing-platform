import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../redux/postSlice"; // Import fetchPosts action
import { AppDispatch } from "../redux/store"; // Import AppDispatch type

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // Access posts and loading state from Redux store
    const { posts, loading, error } = useSelector((state: any) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts()); // Fetch posts on component mount
    }, [dispatch]);

    const handleExploreInterests = () => {
        navigate("/explore");
    };

    const handlePostClick = (postId: string) => {
        navigate(`/post/${postId}`);
    };

    // Show loading or error message if necessary
    if (loading) return <Typography>Loading posts...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Container maxWidth="lg" style={{ paddingTop: "60px" }}>
            {/* Hero Section */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                style={{
                    background: `linear-gradient(to bottom right, rgba(98, 0, 234, 0.8), rgba(3, 218, 197, 0.8)), url("https://www.example.com/hero-image.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "100px 20px",
                    color: "white",
                    borderRadius: "10px",
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" style={{ fontWeight: "bold" }}>
                    Welcome to the Interest Sharing Platform
                </Typography>
                <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Discover and share your interests with others!
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleExploreInterests}
                    style={{ marginTop: "30px", borderRadius: "20px" }}
                >
                    Explore Interests
                </Button>
            </Box>

            {/* Featured Posts Section */}
            <Typography
                variant="h3"
                style={{ margin: "40px 0", fontWeight: "bold", textAlign: "center" }}
            >
                Featured Posts
            </Typography>
            <Grid container spacing={3}>
                {/* Render only the first 5 posts */}
                {posts.slice(0, 5).map((post: any) => (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Paper
                            elevation={6}
                            sx={{
                                position: "relative",
                                cursor: "pointer",
                                borderRadius: "15px",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                            onClick={() => handlePostClick(post.id)}
                        >
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                style={{
                                    width: "100%",
                                    borderRadius: "15px 15px 0 0",
                                    height: "200px",
                                    objectFit: "cover",
                                    transition: "0.4s ease",
                                    borderBottom: "5px solid #ffffff",
                                }}
                            />
                            <Box
                                padding="15px"
                                style={{
                                    position: "absolute",
                                    bottom: "0",
                                    left: "0",
                                    right: "0",
                                    background: "rgba(0, 0, 0, 0.6)",
                                    borderBottomLeftRadius: "15px",
                                    borderBottomRightRadius: "15px",
                                    color: "white",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    style={{ fontWeight: "bold", marginBottom: "10px" }}
                                >
                                    {post.title}
                                </Typography>
                                <Typography variant="body2">{post.description}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
