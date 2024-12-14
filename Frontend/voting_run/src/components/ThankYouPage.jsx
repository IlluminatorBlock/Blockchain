import React from 'react';
import FloatingShape from './shapes/FloatingShape';
const ThankYouPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10 text-center">
                <h1 className="text-3xl font-bold text-green-300 mb-6">Thank You for Voting!</h1>
                <p className="text-green-200 mb-6">Your vote has been recorded successfully.</p>
            </div>
            <FloatingShape />
        </div>
    );
};

export default ThankYouPage;