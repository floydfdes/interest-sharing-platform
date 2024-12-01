import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postApi } from '../api';

interface Post {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
    'posts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await postApi.getAllPosts();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const createPost = createAsyncThunk<Post, { title: string; content: string; tags: string[] }, { rejectValue: string }>(
    'posts/create',
    async (postData, { rejectWithValue }) => {
        try {
            const { data } = await postApi.createPost(postData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Post Slice
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch posts';
            })
            // Create Post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create post';
            });
    },
});

// Export Reducer
export default postSlice.reducer;
