import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.userInfo.token}`,
                },
            };

            const response = await axios.put(
                `${API_URL}/users/profile`,
                userData,
                config
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePreferences = createAsyncThunk(
    'user/updatePreferences',
    async (preferences, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.userInfo.token}`,
                },
            };

            const response = await axios.put(
                `${API_URL}/users/preferences`,
                preferences,
                config
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFavorites = createAsyncThunk(
    'user/fetchFavorites',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.userInfo.token}`,
                },
            };

            const response = await axios.get(`${API_URL}/users/favorites`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    profile: null,
    preferences: {
        theme: 'light',
        notifications: true,
    },
    favorites: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update profile';
            })
            // Update Preferences
            .addCase(updatePreferences.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePreferences.fulfilled, (state, action) => {
                state.loading = false;
                state.preferences = action.payload.preferences;
            })
            .addCase(updatePreferences.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to update preferences';
            })
            // Fetch Favorites
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch favorites';
            });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer; 