import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/gameSlice';

const GameCard = ({ game }) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const isFavorite = game.isFavorite || false;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        if (userInfo) {
            dispatch(toggleFavorite({ gameId: game._id, isFavorite }));
        }
    };

    return (
        <Link to={`/game/${game._id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                    <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                            {game.rating.toFixed(1)} ★
                        </span>
                    </div>
                    {userInfo && (
                        <button
                            onClick={handleFavoriteClick}
                            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            {isFavorite ? '❤️' : '🤍'}
                        </button>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {game.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {game.genres.slice(0, 3).map((genre) => (
                            <span
                                key={genre}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {game.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default GameCard; 