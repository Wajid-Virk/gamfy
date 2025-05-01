import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App; 