import axios from 'axios';

// Create a base Axios instance
const API = axios.create({
    baseURL: 'http://localhost:4000/api',
});

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

// User API
export const userApi = {
    register: (formData: { username: string; email: string; password: string }) =>
        API.post('/users/register', formData),
    login: (formData: { email: string; password: string }) =>
        API.post('/users/login', formData),
    getProfile: () => API.get('/users/profile'),
    updateProfile: (formData: { username?: string; email?: string; password?: string }) =>
        API.put('/users/profile', formData),
    deleteProfile: () => API.delete('/users/profile'),
    getAllUsers: () => API.get('/users'), // Admin only
};

// Post API
export const postApi = {
    getAllPosts: () => API.get('/posts'),
    createPost: (postData: { title: string; content: string; tags: string[] }) =>
        API.post('/posts', postData),
    getPostById: (id: string) => API.get(`/posts/${id}`),
    updatePost: (
        id: string,
        updatedData: { title?: string; content?: string; tags?: string[] }
    ) => API.put(`/posts/${id}`, updatedData),
    deletePost: (id: string) => API.delete(`/posts/${id}`),
    likePost: (id: string) => API.post(`/posts/${id}/like`),
};

export default { userApi, postApi };
