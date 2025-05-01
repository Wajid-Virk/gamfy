import React from 'react';

const genres = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Simulation',
    'Sports',
    'Racing',
    'Puzzle',
    'Platformer',
    'Fighting',
];

const FilterBar = ({
    genre,
    rating,
    sort,
    onGenreChange,
    onRatingChange,
    onSortChange,
}) => {
    return (
        <div className="flex flex-wrap gap-4 mt-4">
            <select
                value={genre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Genres</option>
                {genres.map((g) => (
                    <option key={g} value={g}>
                        {g}
                    </option>
                ))}
            </select>

            <select
                value={rating}
                onChange={(e) => onRatingChange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="1">1+ Stars</option>
            </select>

            <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Sort By</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    );
};

export default FilterBar; 