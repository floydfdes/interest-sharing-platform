// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
