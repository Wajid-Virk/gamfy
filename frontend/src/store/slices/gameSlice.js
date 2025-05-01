import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/games?page=${page}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const searchGames = createAsyncThunk(
    'games/searchGames',
    async ({ query, genre, rating, sort, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/games/search?query=${query}&genre=${genre}&rating=${rating}&sort=${sort}&page=${page}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchGameDetails = createAsyncThunk(
    'games/fetchGameDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/games/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const toggleFavorite = createAsyncThunk(
    'games/toggleFavorite',
    async ({ gameId, isFavorite }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.userInfo.token}`,
                },
            };

            if (isFavorite) {
                await axios.delete(`${API_URL}/games/${gameId}/favorite`, config);
            } else {
                await axios.post(`${API_URL}/games/${gameId}/favorite`, {}, config);
            }

            return { gameId, isFavorite: !isFavorite };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    games: [],
    currentGame: null,
    loading: false,
    error: null,
    page: 1,
    pages: 1,
    total: 0,
};

const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentGame: (state) => {
            state.currentGame = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Games
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload.games;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
                state.total = action.payload.total;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch games';
            })
            // Search Games
            .addCase(searchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload.games;
                state.page = action.payload.page;
                state.pages = action.payload.pages;
                state.total = action.payload.total;
            })
            .addCase(searchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Search failed';
            })
            // Fetch Game Details
            .addCase(fetchGameDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGame = action.payload;
            })
            .addCase(fetchGameDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch game details';
            })
            // Toggle Favorite
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const { gameId, isFavorite } = action.payload;
                if (state.currentGame && state.currentGame._id === gameId) {
                    state.currentGame.isFavorite = isFavorite;
                }
            });
    },
});

export const { clearError, clearCurrentGame } = gameSlice.actions;
export default gameSlice.reducer; 