import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { posts } from "../data/data";
import { useParams } from "react-router-dom";

const PostDetailPage: React.FC = () => {
    const { id } = useParams();
    const [currentPost, setCurrentPost] = useState(() => posts.find((post) => post.id == id));
    const [newComment, setNewComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(currentPost?.content || "");

    if (!currentPost) return <Typography variant="h5">Post not found</Typography>;

    const handleLike = () => {
        setCurrentPost((prev) => {
            if (!prev) return undefined;
            return { ...prev, likes: prev.likes + 1 };
        });
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setCurrentPost((prev) => {
                if (!prev) return undefined;
                return {
                    ...prev,
                    comments: [
                        ...prev.comments,
                        { id: String(Date.now()), userId: "currentUser", text: newComment },
                    ],
                };
            });
            setNewComment("");
        }
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSaveEdit = () => {
        setCurrentPost((prev) => {
            if (!prev) return undefined;
            return { ...prev, content: editedContent };
        });
        setIsEditing(false);
    };

    return (
        <Box p={3}>
            <Typography variant="h4">{currentPost.title}</Typography>
            <img src={currentPost.imageUrl} alt={currentPost.title} style={{ width: "100%", margin: "20px 0" }} />
            <Typography variant="body1" paragraph>
                {isEditing ? (
                    <TextField
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        fullWidth
                        multiline
                    />
                ) : (
                    currentPost.content
                )}
            </Typography>
            {isEditing ? (
                <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                    Save
                </Button>
            ) : (
                <Button variant="contained" color="secondary" onClick={handleEditToggle}>
                    Edit Post
                </Button>
            )}
            <Button variant="outlined" onClick={handleLike} style={{ marginLeft: "10px" }}>
                Like ({currentPost.likes})
            </Button>

            <Box mt={3}>
                <Typography variant="h5">Comments</Typography>
                {currentPost.comments.map((comment) => (
                    <Box key={comment.id} mt={1} p={2} style={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
                        <Typography variant="body2">
                            <strong>User {comment.userId}:</strong> {comment.text}
                        </Typography>
                    </Box>
                ))}
                <Box mt={2} display="flex">
                    <TextField
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                    />
                    <Button onClick={handleAddComment} variant="contained" color="primary" style={{ marginLeft: "10px" }}>
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default PostDetailPage;
