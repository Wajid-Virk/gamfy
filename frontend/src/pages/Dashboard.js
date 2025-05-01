import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { fetchFavorites, updatePreferences } from '../store/slices/userSlice';
import GameCard from '../components/GameCard';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isDarkMode, toggleTheme } = useTheme();
    const { favorites, preferences, loading, error } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const handleThemeToggle = () => {
        toggleTheme();
        dispatch(
            updatePreferences({
                ...preferences,
                theme: isDarkMode ? 'light' : 'dark',
            })
        );
    };

    const handleNotificationsToggle = () => {
        dispatch(
            updatePreferences({
                ...preferences,
                notifications: !preferences.notifications,
            })
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            Preferences
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">
                                    Dark Mode
                                </span>
                                <button
                                    onClick={handleThemeToggle}
                                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                                >
                                    {isDarkMode ? '🌞' : '🌙'}
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600 dark:text-gray-300">
                                    Notifications
                                </span>
                                <button
                                    onClick={handleNotificationsToggle}
                                    className={`p-2 rounded-lg ${preferences.notifications
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                >
                                    {preferences.notifications ? '🔔' : '🔕'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            Favorite Games
                        </h2>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        {loading ? (
                            <div className="text-center py-8">Loading favorites...</div>
                        ) : favorites.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No favorite games yet
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map((game) => (
                                    <GameCard key={game._id} game={game} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 