import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import FloatingShape from './shapes/FloatingShape';

const ThankYouPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10 text-center">
                <h1 className="text-3xl font-bold text-green-300 mb-6">Thank You for Voting!</h1>
                <p className="text-green-200 mb-6">Your vote has been recorded successfully.</p>
                
                {/* Voting Statistics Redirect Box */}
                <Link to="/candidate-states" className="block mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transition duration-300 shadow-md">
                    Show Voting Statistics
                </Link>
            </div>
            <FloatingShape />
        </div>
    );
};

export default ThankYouPage;
