import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import GameCard from '../components/GameCard';

const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Fetch games from API
        // For now, using placeholder data
        const dummyGames = [
            {
                id: 1,
                name: "The Witcher 3",
                background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
                rating: 4.7,
                genres: [{ id: 1, name: "RPG" }, { id: 2, name: "Action" }]
            },
            {
                id: 2,
                name: "Red Dead Redemption 2",
                background_image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
                rating: 4.8,
                genres: [{ id: 3, name: "Action" }, { id: 4, name: "Adventure" }]
            }
        ];
        setGames(dummyGames);
        setLoading(false);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-center mb-4">Discover Amazing Games</h1>
                <SearchBar />
            </div>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home; 