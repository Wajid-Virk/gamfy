import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Gamfy. All rights reserved.</p>
                <p className="mt-2 text-sm text-gray-400">
                    Powered by RAWG API
                </p>
            </div>
        </footer>
    );
};

export default Footer; 