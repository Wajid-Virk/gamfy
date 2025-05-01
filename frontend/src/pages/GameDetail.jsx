import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameDetails, toggleFavorite } from '../store/slices/gameSlice';

const GameDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentGame, loading, error } = useSelector((state) => state.games);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchGameDetails(id));
    }, [dispatch, id]);

    const handleFavoriteClick = () => {
        if (userInfo) {
            dispatch(
                toggleFavorite({
                    gameId: currentGame._id,
                    isFavorite: currentGame.isFavorite,
                })
            );
        } else {
            navigate('/login');
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading game details...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    if (!currentGame) {
        return <div className="text-center py-8">Game not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <img
                        src={currentGame.coverImage}
                        alt={currentGame.title}
                        className="w-full h-96 object-cover"
                    />
                    {userInfo && (
                        <button
                            onClick={handleFavoriteClick}
                            className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            {currentGame.isFavorite ? '❤️' : '🤍'}
                        </button>
                    )}
                </div>

                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        {currentGame.title}
                    </h1>
                    <div className="flex items-center mb-4">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-gray-600 dark:text-gray-300">
                            {currentGame.rating.toFixed(1)}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600 dark:text-gray-300">
                            {new Date(currentGame.releaseDate).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            Description
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {currentGame.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Details
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Developer:</span>{' '}
                                    {currentGame.developer}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Publisher:</span>{' '}
                                    {currentGame.publisher}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Platforms:</span>{' '}
                                    {currentGame.platforms.join(', ')}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Genres
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {currentGame.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {currentGame.screenshots && currentGame.screenshots.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                Screenshots
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentGame.screenshots.map((screenshot, index) => (
                                    <img
                                        key={index}
                                        src={screenshot}
                                        alt={`${currentGame.title} screenshot ${index + 1}`}
                                        className="rounded-lg shadow-md"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameDetail; 