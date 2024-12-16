import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Adjusted path to Home component
import VotingPage from './components/VotingPage'; // Adjusted path to VotingPage component
import ThankYouPage from './components/ThankYouPage'; // Adjusted path to ThankYouPage component
import LoginPage from './components/Login'; // Adjusted path to LoginPage component
import SignUpPage from './components/Signup'; // Adjusted path to SignUpPage component



// import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/voting" element={<VotingPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
            </Routes>
        </Router>
    );
};

export default App;