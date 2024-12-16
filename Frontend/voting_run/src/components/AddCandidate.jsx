import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import FloatingShape from './shapes/FloatingShape';

const AddCandidate = () => {
    const [name, setName] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleAddCandidate = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('add_candidate/', {
                name,
                secret_key: secretKey,
            });
            if (response.data.status === 'success') {
                setMessage('Candidate added successfully!');
                setError('');
                resetForm(); // Reset form after successful submission
            } else {
                setError(response.data.message || 'An error occurred while adding the candidate.');
                setMessage('');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred while adding the candidate.');
            setMessage('');
        }
    };

    // Reset the form fields
    const resetForm = () => {
        setName('');
        setSecretKey('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-green-900 via-emerald-900 relative">
            <div
                style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.7)',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '24rem',
                    zIndex: 10,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    paddingRight: '15px',
                    scrollbarWidth: 'none',
                    margin: '0 auto',
                }}
                className="scrollable-container"
            >
                <h2 className="text-2xl font-bold text-green-300 mb-6 text-center">Add Candidate</h2>
                <form onSubmit={handleAddCandidate}>
                    <div className="mb-4">
                        <label className="block text-green-300 mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Candidate Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-300 mb-2">Secret Key</label>
                        <input
                            type="password" // Make secret key input field like a password
                            placeholder="Secret Key"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            className="mt-1 block w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-green-300"
                            required
                        />
                    </div>
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mt-4">
                        Add Candidate
                    </button>
                </form>
            </div>
            <FloatingShape />
        </div>
    );
};

export default AddCandidate;
