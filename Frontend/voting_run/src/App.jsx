import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import VotingPage from './components/VotingPage';
import ThankYouPage from './components/ThankYouPage';
import SignUpPage from './components/Signup';
import AddCandidate from './components/AddCandidate';
import RemoveCandidate from './components/RemoveCandidate';
import CandidateStates from './components/CandidateStates';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/voting" element={<VotingPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/add-candidate" element={<AddCandidate />} />
                <Route path="/remove-candidate" element={<RemoveCandidate />} />
                <Route path="/candidate-states" element={<CandidateStates />} /> {/* Add route for CandidateStates */}
            </Routes>
        </Router>
    );
};

export default App;