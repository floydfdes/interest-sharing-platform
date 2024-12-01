import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createPost } from '../redux/postSlice'; // Import the action to create a post
import { AppDispatch } from '../redux/store';

const CreatePostPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // Initialize useNavigate
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState<string>(''); // This will hold the Base64 string
    const [tags, setTags] = useState<string[]>([]);
    const [featured, setFeatured] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const base64 = await compressImage(file);
            setImageUrl(base64);
        }
    };

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    if (!ctx) return reject("Canvas context not available");

                    const MAX_WIDTH = 800;
                    const scale = Math.min(MAX_WIDTH / img.width, 1);
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
                    resolve(compressedBase64);
                };
                img.onerror = reject;
                img.src = reader.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postData = {
            title,
            description,
            content,
            imageUrl, // This will now be the Base64 string
            tags,
            featured,
            likes: 0,
            comments: [],
        };

        await dispatch(createPost(postData));
        resetForm();
        navigate('/explore'); // Redirect to the Explore page after creating the post
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setContent('');
        setImageUrl('');
        setTags([]);
        setFeatured(false);
    };

    return (
        <Box p={3} maxWidth="600px" margin="0 auto">
            <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                Create a New Post
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    margin="normal"
                />
                <input
                    type="file"
                    accept="image/*" // Accept only image files
                    onChange={handleImageUpload}
                    style={{ margin: '16px 0' }} // Add some margin for spacing
                />
                <TextField
                    label="Tags (comma separated)"
                    value={tags.join(', ')}
                    onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                    fullWidth
                    margin="normal"
                />
                <Box display="flex" alignItems="center" margin="normal">
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <Typography variant="body1" style={{ marginLeft: '8px' }}>
                        Featured
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" type="submit">
                    Create Post
                </Button>
            </form>
        </Box>
    );
};

export default CreatePostPage;