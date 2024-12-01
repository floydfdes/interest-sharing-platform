// src/redux/userSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from '../api';

export const registerUser = createAsyncThunk(
    'user/register',
    async (formData: { username: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const { data } = await userApi.register(formData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (formData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const { data } = await userApi.login(formData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await userApi.getProfile();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// User Slice
const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, loading: false, error: null as string | null },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('profile');
        },
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem('profile', JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem('profile', JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch Profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Export Actions and Reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
