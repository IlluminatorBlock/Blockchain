import { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import the Axios instance
import FloatingShape from './shapes/FloatingShape';

const RemoveCandidate = () => {
    const [candidateId, setCandidateId] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRemoveCandidate = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('remove_candidate/', {
                candidate_id: candidateId,
                secret_key: secretKey,
            });
            if (response.data.status === 'success') {
                setMessage('Candidate removed successfully!');
                setError('');
                // Reset the form fields
                setCandidateId('');
                setSecretKey('');
            } else {
                setError(response.data.message || 'An error occurred while removing the candidate.');
                setMessage('');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred while removing the candidate.');
            setMessage('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative">
            <div
                style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.7)', // bg-gray-800 with opacity
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '24rem',
                    zIndex: 10,
                    maxHeight: '90vh', // Limit height for scrolling
                    overflowY: 'auto', // Enable vertical scrolling
                    paddingRight: '15px', // Prevent content from being cut off
                    scrollbarWidth: 'none', // Hide scrollbar for Firefox
                    margin: '0 auto', // Center the container
                }}
                className="scrollable-container"
            >
                <h2 className="text-2xl font-bold text-green-300 mb-6 text-center">Remove Candidate</h2>
                <form onSubmit={handleRemoveCandidate}>
                    <div className="mb-4">
                        <label className="block text-green-300 mb-2">Candidate ID</label>
                        <input
                            type="text"
                            placeholder="Candidate ID"
                            value={candidateId}
                            onChange={(e) => setCandidateId(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-300 mb-2">Secret Key</label>
                        <input
                            type="password"  // Make the secret key input like a password field
                            placeholder="Secret Key"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mt-4">Remove Candidate</button>
                </form>
            </div>
            <FloatingShape />
        </div>
    );
};

export default RemoveCandidate;
