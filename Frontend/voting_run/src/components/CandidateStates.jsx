import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const CandidateStates = () => {
    const [candidates, setCandidates] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axiosInstance.get('get_candidates/');
                if (response.data.status === 'success') {
                    setCandidates(response.data.candidates);
                } else {
                    setError('Failed to fetch candidates.');
                }
            } catch {
                setError('An error occurred while fetching candidates.');
            }
        };

        const fetchTotalVotes = async () => {
            try {
                const response = await axiosInstance.get('get_total_votes/');
                if (response.status === 200) {
                    setTotalVotes(response.data.total_votes);
                } else {
                    setError('Failed to fetch total votes.');
                }
            } catch {
                setError('An error occurred while fetching total votes.');
            }
        };

        fetchCandidates();
        fetchTotalVotes();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative overflow-hidden">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded shadow-md w-full max-w-4xl z-10 text-center">
                <h1 className="text-3xl font-bold text-green-300 mb-6">Candidate States</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <table className="w-full text-green-300 mb-6">
                    <thead>
                        <tr>
                            <th className="border-b border-green-500 p-2">ID</th>
                            <th className="border-b border-green-500 p-2">Name</th>
                            <th className="border-b border-green-500 p-2">Vote Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(candidate => (
                            <tr key={candidate.id}>
                                <td className="border-b border-green-500 p-2">{candidate.id}</td>
                                <td className="border-b border-green-500 p-2">{candidate.name}</td>
                                <td className="border-b border-green-500 p-2">{candidate.vote_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-green-300 text-xl">
                    <strong>Total Votes:</strong> {totalVotes}
                </div>
            </div>
        </div>
    );
};

export default CandidateStates;