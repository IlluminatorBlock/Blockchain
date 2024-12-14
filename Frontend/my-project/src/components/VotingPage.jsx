import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingShape from './shapes/FloatingShape'; // Adjust the path as necessary

const VotingPage = () => {
    const navigate = useNavigate();
    const [hasVoted, setHasVoted] = useState(false);
    const [votedCandidateId, setVotedCandidateId] = useState(null);
    const [error, setError] = useState(null);

    const candidates = [
        { id: 1, name: 'Candidate One' },
        { id: 2, name: 'Candidate Two' },
        { id: 3, name: 'Candidate Three' },
    ];

    const handleVote = async (candidateId) => {
        setHasVoted(true);
        setError(null); // Reset any previous error

        // Simulate an API call to submit the vote
        try {
            const response = await mockVoteApi(candidateId);
            if (response.success) {
                setVotedCandidateId(candidateId); // Set the voted candidate ID
                // Navigate to the Thank You page after a delay
                setTimeout(() => {
                    navigate('/thank-you');
                }, 2000); // Delay for 2 seconds before navigating
            } else {
                // If the vote failed, handle the error
                setError('There was an error processing your vote. Please try again.');
                setHasVoted(false); // Allow voting again
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            setHasVoted(false); // Allow voting again
        }
    };

    // Mock function to simulate an API call
    const mockVoteApi = (candidateId) => {
        return new Promise((resolve) => {
            // Simulate a random success or failure
            setTimeout(() => {
                const success = Math.random() > 0.2; // 80% chance of success
                resolve({ success });
            }, 1000); // Simulate network delay
        });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative overflow-hidden">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-96 z-10 text-center">
                <h1 className="text-3xl font-bold text-green-300 mb-6">Vote for Your Candidate</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-6">
                    {candidates.map(candidate => (
                        <div key={candidate.id} className="flex items-center justify-between mb-4">
                            <span className={`text-green-200 ${votedCandidateId === candidate.id ? 'text-green-500 font-bold' : ''}`}>
                                {candidate.name}
                            </span>
                            <button 
                                onClick={() => handleVote(candidate.id)} 
                                className={`p-2 rounded transition ${hasVoted ? (votedCandidateId === candidate.id ? 'bg-green-500' : 'bg-gray-500 cursor-not-allowed') : 'bg-green-500 hover:bg-green-600'}`}
                                disabled={hasVoted}
                            >
                                {hasVoted ? 'Voted' : 'Vote'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <FloatingShape />
        </div>
    );
};

export default VotingPage;