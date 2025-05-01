import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        games: gameReducer,
        user: userReducer,
    },
});

export default store; 