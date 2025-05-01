import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from '../store/slices/gameSlice';
import GameCard from '../components/GameCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

const Home = () => {
    const dispatch = useDispatch();
    const { games, loading, error } = useSelector((state) => state.games);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Discover Amazing Games
                </h1>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-8">Loading games...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                        <Link to={`/games/${game._id}`} key={game._id}>
                            <GameCard game={game} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home; 