// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
            <Link to="/" className="flex items-center">
                <img 
                    src="https://images.deepai.org/art-image/84b9bc5be2ff417f897e3c1d4efaacf0/blockchain-based-voting-logo-for-that-any-cre_VwnaLnb.jpg" 
                    alt="Logo" 
                    className="h-16 w-16 rounded-full" // Make the logo circular and larger
                />
            </Link>
            <div className="text-white italic text-sm">
                "The most powerful weapon in the world is the vote." – Lyndon B. Johnson
            </div>
            <div className="space-x-4">
                <Link to="/signup" className="text-green-300 hover:text-green-500">Sign Up</Link>
                <Link to="/voting" className="text-green-300 hover:text-green-500">Vote</Link>
                <Link to="/add-candidate" className="text-green-300 hover:text-green-500">Add Candidate</Link>
                <Link to="/remove-candidate" className="text-green-300 hover:text-green-500">Remove Candidate</Link>
                <Link to="/candidate-states" className="text-green-300 hover:text-green-500">Candidate Details</Link> {/* Updated text */}
            </div>         
        </nav>
    );
};

export default Navbar;